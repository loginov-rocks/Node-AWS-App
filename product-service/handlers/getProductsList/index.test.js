import getProductsList from './index';

const databaseMock = {
  getProductsList: async () => [1, 2, 3],
};

const getProductsListInstance = getProductsList(databaseMock);

it('returns Products from the database', async () => {
  const product = await getProductsListInstance({});

  expect(product).toStrictEqual([1, 2, 3]);
});
