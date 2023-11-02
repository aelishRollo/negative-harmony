console.clear()

let inputString = "aminorb9"    //this will be input from the user, from a textbox or something


const KeyCenter = "C"     //Keycenter should be a global variable for now. This will come from input from the user. Probably a form


interface IntervalMap {     //this is all the intervals with sharps and flats, in terms of half-steps
    [interval: string]: number;
  }
  
  const intervalMap: IntervalMap = {
    "b2": 1,
    "2": 2,
    "b3": 3,
    "3": 4,
    "4": 5,
    "b5": 6,
    "5": 7,
    "#5": 8,
    "b6": 8,
    "6": 9,
    "b7": 10,
    "7": 11,
    "major7": 11,
    "8": 12 % 12,
    "b9": 13 % 12,
    "9": 14 % 12,
    "#9": 15 % 12,
    "b10": 15 % 12,
    "10": 16 % 12,
    "11": 17 % 12,
    "#11": 18 % 12,
    "b12": 18 % 12,
    "12": 19 % 12,
  };
  
  const MusicalNotes: string[] = ["c", "csharp", "d", "dsharp", "e", "f", "fsharp", "g", "gsharp", "a", "asharp", "b"];
  
            //the integer associated with each note can be accessed using the .indexOf() method 
            // MusicalNotes.indexOf("c")   returns 0 

  
  function removeDuplicateStringsFromArray(arr:string[]): string[] {    //sub-function
    const result: string[] = []
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i])
        }
    }
    return result
  }

  //bathroom code: 1 4 7 8 9  
  //console.log(parseChordName('Cmajor7b9#11')) returns ["C", "major7", "b9#11"]
function parseChordName(chordName: string): string[] {
  const result: string[] = ['', '', ''];
  const regex = /^([A-Ga-g][#b]?)([^#b\s]*\d*)(.*)$/;
  const matches = chordName.match(regex);

  if (matches) {
    result[0] = matches[1]; // root note
    result[1] = matches[2]; // chord type
    result[2] = matches[3]; // extensions or alterations
  }
  return result;  //returns [root, chord type, extensions]
}
  
  class Chord2 {
    public notes: number[] = [];
    
    constructor(public root: string, public quality: string, public extensions: string[] = []) {}  //don't HAVE to initialize yet this way
  }
  
//))))))))))))))))))))))))))))))))))))))))))OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoo
  
  class Chord {
  
    public name: string;
    public root: string;
    public quality: string;
    public extensions: string;
    public notes: number[];
    public inversion: number;
    
    constructor(root: string, quality: string, extensions: string, inversion: number) {
  
      this.name = inputString;
      [this.root] = parseChordName(this.name);          //using destructuring assignments to get the 1st, 2nd, and 3rd return values of the function      
      [,this.quality] = parseChordName(this.name);
      [,,this.extensions] = parseChordName(this.name);
      this.notes = [];
      this.inversion = inversion;
  
      setRoot(this)
      setThird(this)
      setFifth(this)
      //this.notes.push( (this.notes[0] +7) % 12 );   //add the fifth. Will need to be refactored to take altered and augmented chords
  
      this.notes = setInversion(this.notes,this.inversion)
      
    }
    
    printName(): void {
      console.log(this.root, this.quality);
    }
    
    getNotes(): number[] {
      return this.notes;
    }
  }

  
  
  function findFifth(note:string): string {
    let indexOfFifth = (MusicalNotes.indexOf(note) + 7) % 12
    let fifth = MusicalNotes[indexOfFifth]
    return fifth
  };

  

  function getIntervalFromKeyCenter(note: string): number {

    let noteAsNumber = MusicalNotes.indexOf(note)
    let keyCenterAsNumber = MusicalNotes.indexOf(KeyCenter)

    let normalizedNote = noteAsNumber % 12;

    0x10 
    let interval;
  
    if (normalizedNote >= keyCenterAsNumber) {
      interval = normalizedNote - keyCenterAsNumber;
    } else {
      interval = 12 + (normalizedNote - keyCenterAsNumber);
    }
  
    return interval;
  };

  function invertNote(note:string):string{

    let result = ''
    let tempNumber = 0

    let interval = getIntervalFromKeyCenter(note)

    const intervalToResult = [7, 6, 5, 4, 3, 2, 1, 12, 11, 10, 9, 8];

    tempNumber = intervalToResult[interval];
    
    result = MusicalNotes[tempNumber]

    if (result == undefined) {    //inelegant solution to an edge case. But hey, it works
      result = note
    };

    return result
  };

  
  


  //Explanation of which chords map to what

  //major <---> minor   Root is inverted fifth

  //major7 <---> minor6   Root is inverted fifth
  


  function invertChord(chord: Chord): [string,string] {   //returns invertedRoot, invertedChordQuality
    let root = chord.root
    let newRoot = invertNote(findFifth(root))
    let newQuality = invertChordQuality(chord.quality)
    
    return [newRoot,newQuality]
  };

  
  function invertChordQuality(quality:string): string {
    let result = ''

    if (quality == "major"){
      result = "minor"
    }
    if (quality == "minor"){
      result = "major"
    }
    if (quality == "major7"){
      result = "minorb6"
    }
    if (quality == "minorb6"){
      result = "major7"
    }
    if (quality == "minor7"){
      result = "major6"
    }
    if (quality == "major6"){
      result = "minor7"
    }
    if (quality == "7"){
      result = "minor6"
    }
    if (quality == "minor6"){
      result = "7"
    }
    if (quality == "major9"){
      result = "minor9"
    }
    if (quality == "minor9"){
      result = "major9"
    }
    if (quality == "sus2"){
      result = "sus4"
    }
    if (quality == "sus4"){
      result = "sus2"
    }
    if (quality == "halfdiminished"){
      result = "7"
    }
    if (quality == "diminished"){
      result = "diminished"
    }


    return result

  };


  


  function setRoot(chord: Chord) {                              //refactor these to be methods of the chord object
    chord.notes = [MusicalNotes.indexOf(chord.root)];
  }
  
  
  function setThird(chord: Chord) {                 //this function should handle sus chord logic. Just an if (sus) then do nothing kinda thing
    if (chord.quality.includes("minor")) {
      chord.notes.push((chord.notes[0] +3) % 12 );  //add the minor third to chord.notes
    }
   else if (chord.quality.includes("major")) {
      chord.notes.push((chord.notes[0] +4) % 12 );  //add the major third to chord.notes
    }
  }

  function setFifth(chord: Chord) {
    chord.notes.push((chord.notes[0] +7) % 12)
  };

    
  function shiftArray(arr: number[]): number[] {      //function for setInversion()
    if (arr.length === 0) {
      return arr; // If the array is empty, return it as is
    }
    const firstValue = arr.shift() as number; // Remove the first value and store it as a number
    arr.push(firstValue); // Add the first value to the end of the array
    return arr;
  }
  

  function setInversion(notes: number[], inversion: number) {   //Refactor this one in the same way
  
    if (inversion >= notes.length) {
       throw new Error("Invalid inversion value. Inversion value cannot be greater than or equal to the number of notes in your chord.")
    };
  
    for (let i = 0; i < inversion; i++) {
      notes = shiftArray(notes)
    }
    return notes
  }
  
  

  function invertNotesAroundKeyCenter(chord: Chord) {   //may use later for arrays of individual notes
    let result: number[] = [];
    for (let i = 0; i < chord.notes.length; i++) {
      console.log(chord.notes[i])
    }
  };
  
  module.exports = {parseChordName,removeDuplicateStringsFromArray};

  function main() {

  let x = new Chord(parseChordName(inputString)[0],parseChordName(inputString)[1],parseChordName(inputString)[2],0)

  //console.log(x)
  //console.log(invertChord(x))
  console.log(parseChordName("cmajor7b9#11"))
  }

  main()
  
  
  
  //still need to make it so capitalization doesn't matter

  //the main priority right now is to actually sit down at the piano, play each chord type, and make a chart of the inversion for myself
  //on paper. Then I can feed that information into my program.

  //I want to focus on getting every chord type done for each interval, in sequence. That way I won't have to go back and forth. It would be too chaotic and messy
