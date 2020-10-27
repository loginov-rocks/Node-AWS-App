/**
 * Module implementing Get Products List business logic.
 * Database layer injected as a dependency.
 */
module.exports = database => async event => {
  const productsList = await database.getProductsList();

  return productsList;
};
