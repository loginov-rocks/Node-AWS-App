import HttpError from './HttpError';

/**
 * Specific extension of the HTTP error to represent Not Found error.
 */
export default class NotFoundHttpError extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}
