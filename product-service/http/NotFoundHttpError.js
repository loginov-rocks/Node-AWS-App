const HttpError = require('./HttpError.js');

/**
 * Specific extension of the HTTP error to represent Not Found error.
 */
class NotFoundHttpError extends HttpError {
  constructor() {
    super(404, 'Not Found');
  }
}

module.exports = NotFoundHttpError;
