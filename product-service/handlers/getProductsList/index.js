/**
 * Module implementing Get Products List business logic.
 * Database layer injected as a dependency.
 */
export default database => async event => {
  const productsList = await database.getProductsList();

  return productsList;
};
