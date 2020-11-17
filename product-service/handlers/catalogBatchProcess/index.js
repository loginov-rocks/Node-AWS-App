import AwsSdk from 'aws-sdk';

const snsTopicArn = process.env.SNS_TOPIC_ARN;

// TODO: WIP.
export default async (event) => {
  console.log('catalogBatchProcess triggered:', event);

  const sns = new AwsSdk.SNS();

  const data = event.Records.map(({ body }) => body);

  // TODO: This doesn't work.
  sns.publish({
    Message: JSON.stringify(data),
    Subject: 'Test',
    TopicArn: snsTopicArn,
  }, (error, _data) => {
    if (error) {
      console.error('catalogBatchProcess SNS error:', error);
    } else {
      console.log('catalogBatchProcess SNS data:', _data);
    }
  });

  console.log(data);
}
