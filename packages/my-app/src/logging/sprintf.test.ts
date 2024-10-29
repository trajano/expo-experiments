import { sprintf } from './sprintf';

test('floating decimal', () => {
  expect(sprintf('foo %f', 2.523)).toEqual('foo 2.523');
  expect(sprintf('%f', 2.523)).toEqual('2.523');
  expect(sprintf('%f', 'asdf')).toEqual('NaN');
});

test('Precision', () => {
  expect(sprintf('Foo %.2f', 1.1)).toEqual('Foo 1.10');
  expect(sprintf('Foo %.2d', 1.1)).toEqual('Foo 01');
  expect(sprintf('Foo %.3d', 1.1)).toEqual('Foo 001');
  expect(sprintf('Foo %.3d', 21111.1)).toEqual('Foo 21111');
  expect(sprintf('Foo %.3d', 'Foo')).toEqual('Foo NaN');
});

test('floating string', () => {
  expect(sprintf('foo %s', 2.523)).toEqual('foo 2.523');
  expect(sprintf('%s', 'bar')).toEqual('bar');
});

test('integer', () => {
  expect(sprintf('foo %d', 2.523)).toEqual('foo 2');
  expect(sprintf('foo %.2d', 2.523)).toEqual('foo 02');
  expect(sprintf('%d', 'bar')).toEqual('NaN');
});

test('unsupported placeholders', () => {
  expect(sprintf('%X', 2.523)).toEqual('%X');
  expect(sprintf('foo %X', 'bar')).toEqual('foo %X');
});

test("values that don't normally get rendered", () => {
  expect(sprintf('%s', new Date())).not.toHaveLength(0);
  expect(sprintf('%s', () => Promise.resolve())).not.toHaveLength(0);
});

test('no place holders', () => {
  expect(sprintf('foo', 2.523)).toEqual('foo');
  expect(sprintf('', 'bar')).toEqual('');
});

test('bad precision', () => {
  expect(sprintf('foo %.213123', 2.523)).toEqual('foo %.213123');
  expect(sprintf('foo %.nanf', 2.523)).toEqual('foo %.nanf');
  expect(sprintf('foo %.nand', 2.523)).toEqual('foo %.nand');
});

test('JSON', () => {
  expect(sprintf('foo %o', 2.523)).toEqual('foo 2.523');
  expect(sprintf('foo %o', { a: 2.523 })).toEqual(`foo {"a":2.523}`);
  expect(sprintf('foo %o', 'ABC')).toEqual(`foo "ABC"`);
  expect(sprintf('foo %o %s', null)).toEqual('foo null undefined');
});
