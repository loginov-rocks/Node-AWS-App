import * as database from './database';
import catalogBatchProcessHandler from './handlers/catalogBatchProcess';
import createProductHandler from './handlers/createProduct';
import getProductByIdHandler from './handlers/getProductById';
import getProductsListHandler from './handlers/getProductsList';
import wrapHttpHandler from './http/wrapHttpHandler';

export const catalogBatchProcess = catalogBatchProcessHandler(database);

export const createProduct = wrapHttpHandler(createProductHandler(database));

export const getProductById = wrapHttpHandler(getProductByIdHandler(database));

export const getProductsList = wrapHttpHandler(getProductsListHandler(database));
