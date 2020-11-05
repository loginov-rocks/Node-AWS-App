import productsList from './productsList.json';

/**
 * Module pretending to be a database layer.
 * Async approach used to comply with the possible interface in the future integration.
 */
export const getProductById = async (id) => {
  return productsList.find(product => product.id === id);
};

export const getProductsList = async () => {
  return productsList;
};
