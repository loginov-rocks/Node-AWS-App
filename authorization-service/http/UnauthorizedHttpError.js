import HttpError from './HttpError';

/**
 * Specific extension of the HTTP error to represent Unauthorized error.
 */
export default class UnauthorizedHttpError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}
