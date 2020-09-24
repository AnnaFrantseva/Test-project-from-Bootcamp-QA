function sum(a,b) {
   return a + b;
 }
module.exports = sum;

test('adds 1 + 2 to equal 3', () => {
 expect(sum(1, 2)).toBe(3);
});
describe('Sum function', () => {
  test('Returns 8 for 5+3', () => {
    const result = sum(5, 3);
    expect(result).toEqual(8)
 });
});