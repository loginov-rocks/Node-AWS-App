export default async (event) => {
  console.log('importFileParser triggered:', event);

  // TODO: Use readable stream to get an object from S3,
  //  parse it via csv-parser and log each record to be
  //  shown in CloudWatch. Return correct HTTP response.
  //  At the end copy the file into the parsed dir, then
  //  delete from uploaded dir.

  return { result: true };
}
