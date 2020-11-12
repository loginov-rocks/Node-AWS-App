import AwsSdk from 'aws-sdk';

import BadRequestHttpError from '../../http/BadRequestHttpError';

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_REGION;
const uploadedPrefix = process.env.S3_UPLOADED_PREFIX;

export default async (event) => {
  console.log('importProductsFile triggered:', event);

  const fileName = event.queryStringParameters && event.queryStringParameters.name;

  if (!fileName) {
    throw new BadRequestHttpError('Missing name query parameter');
  }

  const key = uploadedPrefix + fileName;
  const s3 = new AwsSdk.S3({ region });

  const alreadyExists = await s3.headObject({
    Bucket: bucketName,
    Key: key,
  })
      .promise()
      .then(() => true)
      .catch(error => {
        if (error.code === 'NotFound') {
          return false;
        }

        throw error;
      });

  if (alreadyExists) {
    throw new BadRequestHttpError('File with the requested name already exists');
  }

  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: bucketName,
    ContentType: 'text/csv',
    Expires: 60,
    Key: key,
  });

  return { signedUrl };
}
