import importFileParserHandler from './handlers/importFileParser';
import importProductsFileHandler from './handlers/importProductsFile';
import queueHandlerHandler from './handlers/queueHandler';
import wrapHttpHandler from './http/wrapHttpHandler';

export const importFileParser = wrapHttpHandler(importFileParserHandler, 202);

export const importProductsFile = wrapHttpHandler(importProductsFileHandler);

export const queueHandler = wrapHttpHandler(queueHandlerHandler);
