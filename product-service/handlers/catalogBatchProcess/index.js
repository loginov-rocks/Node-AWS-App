import AwsSdk from 'aws-sdk';

const snsTopicArn = process.env.SNS_TOPIC_ARN;

// TODO: Iterate over all SQS messages and create corresponding products in the
//  products table, send an email once it creates products, cover by unit tests.
export default async (event) => {
  console.log('catalogBatchProcess triggered:', event);

  const sns = new AwsSdk.SNS();
  const data = event.Records.map(({ body }) => body);
  const result = await sns.publish({
    Message: JSON.stringify(data),
    TopicArn: snsTopicArn,
  })
      .promise();

  console.log('catalogBatchProcess finished:', result);
}
