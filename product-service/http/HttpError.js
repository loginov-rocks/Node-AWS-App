/**
 * General extension of the Error to represent errors in the HTTP context.
 */
export default class HttpError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
