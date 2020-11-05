import * as database from './database';
import getProductByIdHandler from './handlers/getProductById';
import getProductsListHandler from './handlers/getProductsList';
import wrapHttpHandler from './http/wrapHttpHandler';

/**
 * Index of the functions.
 */
export const getProductById = wrapHttpHandler(getProductByIdHandler(database));

export const getProductsList = wrapHttpHandler(getProductsListHandler(database));
