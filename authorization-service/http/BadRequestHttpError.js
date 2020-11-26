import HttpError from './HttpError';

/**
 * Specific extension of the HTTP error to represent Bad Request error.
 */
export default class BadRequestHttpError extends HttpError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}
