import AwsSdkMock from 'aws-sdk-mock';
import fs from 'fs';
import path from 'path';

import importFileParser from './index';

const fixture = path.resolve('__fixtures__/import-test.csv');

it('parses and moves the file', async () => {
  const getObjectMock = jest.fn((params, callback) => {
    // TODO: This is not working, on(data) not triggered.
    callback(null, fs.readFileSync(fixture));
  });

  const copyObjectMock = jest.fn((params, callback) => {
    callback(null);
  });

  const deleteObjectMock = jest.fn((params, callback) => {
    callback(null);
  });

  // TODO: Works only if fs.readFileSync(fixture) passed directly instead of getObjectMock.
  AwsSdkMock.mock('S3', 'getObject', getObjectMock);
  AwsSdkMock.mock('S3', 'copyObject', copyObjectMock);
  AwsSdkMock.mock('S3', 'deleteObject', deleteObjectMock);

  const result = await importFileParser({
    Records: [
      {
        s3: {
          object: {
            key: 'uploaded/key',
          },
        },
      },
    ],
  });

  expect(result).toBeUndefined();
  expect(getObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', Key: 'uploaded/key' });
  expect(copyObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', CopySource: 'bucket/uploaded/key', Key: 'parsed/key' });
  expect(deleteObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', Key: 'uploaded/key' });
});
