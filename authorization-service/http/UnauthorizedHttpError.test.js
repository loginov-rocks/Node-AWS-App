import UnauthorizedHttpError from './UnauthorizedHttpError';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new UnauthorizedHttpError();

    expect(error.code).toBe(401);
    expect(error.message).toBe('Unauthorized');
  });
});
