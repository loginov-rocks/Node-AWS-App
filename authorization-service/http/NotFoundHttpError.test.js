import NotFoundHttpError from './NotFoundHttpError';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new NotFoundHttpError();

    expect(error.code).toBe(404);
    expect(error.message).toBe('Not Found');
  });
});
