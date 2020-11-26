import AwsSdkMock from 'aws-sdk-mock';

import catalogBatchProcess from './index';

let autoincrementId = 1;

const databaseMock = {
  createProduct: jest.fn(async (data) => ({
    ...data,
    id: autoincrementId++,
  })),
};

const catalogBatchProcessInstance = catalogBatchProcess(databaseMock);

it('creates product for every valid SQS record', async () => {
  const publishMock = jest.fn((params, callback) => {
    callback(null);
  });
  AwsSdkMock.mock('SNS', 'publish', publishMock);

  await catalogBatchProcessInstance({
    Records: [
      {
        body: JSON.stringify({
          count: 20,
          description: 'Description from the SQS',
          price: 200,
          title: 'Title from the SQS',
        }),
      },
      {
        body: 'Invalid JSON',
      },
      {
        body: JSON.stringify({
          title: 'Invalid Data',
        }),
      },
    ],
  });

  expect(databaseMock.createProduct).lastCalledWith({
    count: 20,
    description: 'Description from the SQS',
    price: 200,
    title: 'Title from the SQS',
  });

  expect(publishMock.mock.calls[0][0]).toMatchObject({
    Message: 'Products with the following IDs have been created: 1.',
  });
});
