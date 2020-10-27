const productsList = require('./productsList.json');

/**
 * Module pretending to be a database layer.
 * Async approach used to comply with the possible interface in the future integration.
 */
module.exports.getProductById = async (id) => {
  return productsList.find(product => product.id === id);
};

module.exports.getProductsList = async () => {
  return productsList;
};
