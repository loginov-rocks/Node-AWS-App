import AwsSdk from 'aws-sdk';
import csvParser from 'csv-parser';

const bucketName = process.env.S3_BUCKET_NAME;
const parsedPrefix = process.env.S3_PARSED_PREFIX;
const region = process.env.S3_REGION;
const uploadedPrefix = process.env.S3_UPLOADED_PREFIX;

export default async (event) => {
  console.log('importFileParser triggered:', event);

  const s3 = new AwsSdk.S3({ region });

  const parallelPromises = event.Records.map(async (record) => {
    const source = record.s3.object.key;
    const destination = parsedPrefix + source.slice(uploadedPrefix.length);

    await new Promise((resolve, reject) => {
      s3.getObject({
        Bucket: bucketName,
        Key: source,
      })
          .createReadStream()
          // Capture S3 service errors separately.
          .on('error', error => {
            reject(error);
          })
          .pipe(csvParser())
          .on('error', error => {
            reject(error);
          })
          .on('data', data => {
            console.log('importFileParser read data:', source, data);
          })
          .on('end', () => {
            console.log('importFileParser finished reading:', source);
            resolve();
          });
    });

    await s3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${source}`,
      Key: destination,
    })
        .promise();

    await s3.deleteObject({
      Bucket: bucketName,
      Key: source,
    })
        .promise();

    console.log('importFileParser moved file:', source, destination);
  });

  await Promise.all(parallelPromises);

  console.log('importFileParser finished');
}
