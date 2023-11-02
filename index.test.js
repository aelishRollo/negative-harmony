const {parseChordName,removeDuplicateStringsFromArray} = require('./index');       //import the index MODULE a.k.a. file, not necessrily function. The index module just happens to import the sum function


describe('parseChordName()', () => {
  test('parses "cmajor7b9#11" correctly', () => {
    const result = parseChordName("cmajor7b9#11");
    expect(result).toEqual(['c', 'major7', 'b9#11']);
  });
  test('parses "abminor7#6" correctly', () => {
    const result = parseChordName("abminor7#6");
    expect(result).toEqual(['ab', 'minor7', '#6']);
  });
  test('parses "f#minor6add9#5" correctly', () => {
    const result = parseChordName("f#minor6add9#5");
    expect(result).toEqual(['f#', 'minor6add9', '#5']);
  });
});

describe('removeDuplicateStringsFromArray', () => {
  test('Removes duplicate strings from array', () => {
    const result = removeDuplicateStringsFromArray(['a','b','c','c'])
    expect(result).toEqual(['a','b','c']);
  });
  console.log(console.log(parseChordName("f#minor6add9#5")))
});
