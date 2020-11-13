import importFileParserHandler from './handlers/importFileParser';
import importProductsFileHandler from './handlers/importProductsFile';
import wrapHttpHandler from './http/wrapHttpHandler';

// TODO: importFileParser should return statusCode: 202 instead of 200.
export const importFileParser = wrapHttpHandler(importFileParserHandler);

export const importProductsFile = wrapHttpHandler(importProductsFileHandler);
