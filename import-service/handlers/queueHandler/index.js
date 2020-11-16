import AwsSdk from 'aws-sdk';

const snsTopic = process.env.SNS_TOPIC;

// TODO: WIP.
export default async (event) => {
  const sns = AwsSdk.SNS();

  const data = event.Records.map(({ body }) => body);

  sns.publish({
    Subject: 'Test',
    Message: JSON.stringify(data),
    TopicArn: snsTopic,
  }, () => {
    console.log('Send email');
  });

  console.log(data);
}
