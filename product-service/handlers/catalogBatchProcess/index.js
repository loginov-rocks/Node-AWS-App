import AwsSdk from 'aws-sdk';

const snsTopicArn = process.env.SNS_TOPIC_ARN;

export default database => async (event) => {
  console.log('catalogBatchProcess triggered:', event);

  const productsResults = await Promise.all(event.Records.map(async record => {
    let count, description, price, title;

    try {
      ({ count, description, price, title } = JSON.parse(record.body));
    } catch {
      console.error('catalogBatchProcess found invalid JSON record:', record.body);
      return;
    }

    if (!count || !description || !price || !title) {
      console.error('catalogBatchProcess found invalid data record');
      return;
    }

    const productData = { count, description, price, title };
    const product = await database.createProduct(productData);

    if (!product) {
      console.error('catalogBatchProcess failed to create product:', productData);
      return;
    }

    return product;
  }));

  const products = productsResults.filter(value => value);

  console.log('catalogBatchProcess created products:', products);

  const sns = new AwsSdk.SNS();
  const result = await sns.publish({
    Message: `Products with the following IDs have been created: ${products.map(product => product.id).join(', ')}.`,
    TopicArn: snsTopicArn,
  })
      .promise();

  console.log('catalogBatchProcess finished:', result);
}
