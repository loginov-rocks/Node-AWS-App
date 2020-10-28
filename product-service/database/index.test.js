import * as database from './index';

describe('getProductById', () => {
  it('returns Product by ID', async () => {
    // Avoiding mocks since the data is a mock itself.
    const product = await database.getProductById('7567ec4b-b10c-48c5-9345-fc73c48a80aa');

    expect(product).toStrictEqual({
      count: 4,
      description: 'Short Product Description1',
      id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
      price: 2.4,
      title: 'ProductOne',
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

    expect(products.length).toBe(8);
    expect(products[0]).toStrictEqual({
      count: 4,
      description: 'Short Product Description1',
      id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
      price: 2.4,
      title: 'ProductOne',
    });
  });
});
