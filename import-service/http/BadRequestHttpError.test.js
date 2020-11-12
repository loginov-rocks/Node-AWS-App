import BadRequestHttpError from './BadRequestHttpError';

describe('constructor', () => {
  it('sets code and message by default', () => {
    const error = new BadRequestHttpError();

    expect(error.code).toBe(400);
    expect(error.message).toBe('Bad Request');
  });
});
