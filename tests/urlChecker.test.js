import { checkForURL } from '../src/js/urlChecker';

test('checkForURL should return true for valid URLs', () => {
  expect(checkForURL('https://example.com')).toBe(true);
  expect(checkForURL('http://example.com')).toBe(true);
  expect(checkForURL('www.example.com')).toBe(false);
});

test('checkForURL should return false for invalid URLs', () => {
  expect(checkForURL('not-a-url')).toBe(false);
  expect(checkForURL('ftp://example.com')).toBe(false);
});
