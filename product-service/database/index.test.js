import * as database from './index';

describe('getProductById', () => {
  it('returns Product by ID', async () => {
    // Avoiding mocks since the data is a mock itself.
    const product = await database.getProductById('first');

    expect(product).toStrictEqual({
      id: 'first',
      title: 'Volkswagen Polo',
      description: 'New car, from 6 to 18 months',
      price: 19000,
    });
  });

  it('returns undefined if Product not found', async () => {
    const product = await database.getProductById('wrong-id');

    expect(product).toBe(undefined);
  });
});

describe('getProductsList', () => {
  it('returns Products list', async () => {
    // Avoiding mocks since the data is a mock itself.
    const products = await database.getProductsList();

    expect(products.length).toBe(10);
    expect(products[0]).toStrictEqual({
      id: 'first',
      title: 'Volkswagen Polo',
      description: 'New car, from 6 to 18 months',
      price: 19000,
    });
  });
});
