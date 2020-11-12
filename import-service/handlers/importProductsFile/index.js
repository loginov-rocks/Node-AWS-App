import BadRequestHttpError from '../../http/BadRequestHttpError';

const bucketName = process.env.BUCKET_NAME;

export default async (event) => {
  console.log('importProductsFile triggered:', event);

  const fileName = event.queryStringParameters && event.queryStringParameters.name;

  if (!fileName) {
    throw new BadRequestHttpError();
  }

  // TODO: Generate signed URL with the key "uploaded/${fileName}", return it.
  //  Check policies. Integrate it with the front end. Cover by unit test,
  //  aws-sdk-mock can be useful.

  return { signedUrl: `${bucketName}/${fileName}` };
}
