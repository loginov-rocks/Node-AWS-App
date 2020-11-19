import AwsSdkMock from 'aws-sdk-mock';

import importProductsFile from './index';

it('returns URL to upload the file', async () => {
  const headObjectMock = jest.fn((params, callback) => {
    callback({ code: 'NotFound' });
  });

  // Regular function mocked because of https://github.com/dwyl/aws-sdk-mock/issues/197
  const getSignedUrlMock = jest.fn((operation, params, callback) => {
    callback(null, 'https://s3.aws.com/signed');
  });

  AwsSdkMock.mock('S3', 'headObject', headObjectMock);
  AwsSdkMock.mock('S3', 'getSignedUrl', getSignedUrlMock);

  const result = await importProductsFile({
    queryStringParameters: {
      name: 'import-test.csv',
    },
  });

  expect(result).toStrictEqual({ signedUrl: 'https://s3.aws.com/signed' });
  expect(headObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', Key: 'uploaded/import-test.csv' });
  expect(getSignedUrlMock.mock.calls[0][0]).toBe('putObject');
  expect(getSignedUrlMock.mock.calls[0][1])
      .toStrictEqual({ Bucket: 'bucket', ContentType: 'text/csv', Expires: 60, Key: 'uploaded/import-test.csv' });
});
