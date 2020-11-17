import * as database from './database';
import catalogBatchProcessHandler from './handlers/catalogBatchProcess';
import createProductHandler from './handlers/createProduct';
import getProductByIdHandler from './handlers/getProductById';
import getProductsListHandler from './handlers/getProductsList';
import wrapHttpHandler from './http/wrapHttpHandler';

/**
 * Index of the functions.
 */
export const catalogBatchProcess = wrapHttpHandler(catalogBatchProcessHandler, 202);

export const createProduct = wrapHttpHandler(createProductHandler(database));

export const getProductById = wrapHttpHandler(getProductByIdHandler(database));

export const getProductsList = wrapHttpHandler(getProductsListHandler(database));
