import generatePolicy from './generatePolicy';

it('generates valid policy', () => {
  expect(generatePolicy('principal', true, 'arn')).toMatchSnapshot();
});
