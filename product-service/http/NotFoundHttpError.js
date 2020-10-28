import HttpError from './HttpError';

/**
 * Specific extension of the HTTP error to represent Not Found error.
 */
export default class NotFoundHttpError extends HttpError {
  constructor() {
    super(404, 'Not Found');
  }
}
