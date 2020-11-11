import * as database from './database';
import createProductHandler from './handlers/createProduct';
import getProductByIdHandler from './handlers/getProductById';
import getProductsListHandler from './handlers/getProductsList';
import wrapHttpHandler from './http/wrapHttpHandler';

/**
 * Index of the functions.
 */
export const createProduct = wrapHttpHandler(createProductHandler(database));

export const getProductById = wrapHttpHandler(getProductByIdHandler(database));

export const getProductsList = wrapHttpHandler(getProductsListHandler(database));
