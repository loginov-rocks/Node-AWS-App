const database = require('./database/index.js');
const getProductById = require('./handlers/getProductById/index.js');
const getProductsList = require('./handlers/getProductsList/index.js');
const wrapHttpHandler = require('./http/wrapHttpHandler.js');

/**
 * Index of the functions.
 */
module.exports.getProductById = wrapHttpHandler(getProductById(database));
module.exports.getProductsList = wrapHttpHandler(getProductsList(database));
