import ForbiddenHttpError from './ForbiddenHttpError';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new ForbiddenHttpError();

    expect(error.code).toBe(403);
    expect(error.message).toBe('Forbidden');
  });
});
