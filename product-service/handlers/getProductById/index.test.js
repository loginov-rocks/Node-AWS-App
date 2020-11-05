import getProductById from './index';
import NotFoundHttpError from '../../http/NotFoundHttpError';

const databaseMock = {
  getProductById: async (id) => {
    if (id !== 'correct-id') {
      return undefined;
    }

    return 'product';
  },
};

const getProductByIdInstance = getProductById(databaseMock);

it('searches database for the Product with the required ID', async () => {
  const product = await getProductByIdInstance({ pathParameters: { id: 'correct-id' } });

  expect(product).toBe('product');
});

it('throws a NotFoundHttpError in case the Product has not been found', async () => {
  expect.assertions(1);

  try {
    const product = await getProductByIdInstance({ pathParameters: { id: 'wrong-id' } });
  } catch (error) {
    expect(error).toBeInstanceOf(NotFoundHttpError);
  }
});
