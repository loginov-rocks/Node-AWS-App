import importFileParserHandler from './handlers/importFileParser';
import importProductsFileHandler from './handlers/importProductsFile';
import wrapHttpHandler from './http/wrapHttpHandler';

export const importFileParser = wrapHttpHandler(importFileParserHandler);

export const importProductsFile = wrapHttpHandler(importProductsFileHandler);
