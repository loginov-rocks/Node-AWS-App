import HttpError from './HttpError';

/**
 * Specific extension of the HTTP error to represent Forbidden error.
 */
export default class ForbiddenHttpError extends HttpError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}
