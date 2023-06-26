const {parseChordName,removeDuplicateStringsFromArray} = require('./index');       //import the index MODULE a.k.a. file, not necessrily function. The index module just happens to import the sum function


describe('Here are my tests hombre', () => {
  test('parses "cmajor7b9#11" correctly', () => {
    const result = parseChordName("cmajor7b9#11");
    expect(result).toEqual(['c', 'major7', 'b9#11']);
  });
  test('Removes duplicate strings from array', () => {
    const result = removeDuplicateStringsFromArray(['a','b','c','c'])
    expect(result).toEqual(['a','b','c']);
  });
});
