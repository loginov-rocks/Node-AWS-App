import AwsSdkMock from 'aws-sdk-mock';
import fs from 'fs';
import path from 'path';

import importFileParser from './index';

const fixturePath = path.resolve('__fixtures__/import-test.csv');

it('parses and moves the file', async () => {
  // No way found to pass mock function which returns a buffer instead of just passing a buffer.
  // For some reason it doesn't work as expected with aws-sdk-mock.
  AwsSdkMock.mock('S3', 'getObject', fs.readFileSync(fixturePath));

  const copyObjectMock = jest.fn((params, callback) => {
    callback(null);
  });
  AwsSdkMock.mock('S3', 'copyObject', copyObjectMock);

  const deleteObjectMock = jest.fn((params, callback) => {
    callback(null);
  });
  AwsSdkMock.mock('S3', 'deleteObject', deleteObjectMock);

  const consoleSpy = jest.spyOn(console, 'log');

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

  expect(copyObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', CopySource: 'bucket/uploaded/key', Key: 'parsed/key' });

  expect(deleteObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', Key: 'uploaded/key' });

  // Check whether console.log() has been triggered on read.
  expect(consoleSpy.mock.calls[1]).toEqual([
    'importFileParser read data:',
    'uploaded/key',
    {
      count: '10',
      description: 'Description 1',
      price: '100',
      title: 'Title 1',
    },
  ]);
});
