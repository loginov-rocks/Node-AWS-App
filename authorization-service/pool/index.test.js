import { validateCredentials } from './index';

it('returns true for valid credentials', () => {
  expect(validateCredentials('username', 'password')).toBeTruthy();
});

it('returns false for invalid credentials', () => {
  expect(validateCredentials('invalid', 'password')).toBeFalsy();
  expect(validateCredentials('username', 'invalid')).toBeFalsy();
});
