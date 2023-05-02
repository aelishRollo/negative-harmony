console.clear()

let inputString = "CMajor7b9#11"    //this will be input from the user, from a textbook or something



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
  
  
  
  
  
  
  
  const MusicalNotes: string[] = ["C", "CSharp", "D", "DSharp", "E", "F", "FSharp", "G", "GSharp", "A", "ASharp", "B"];
  
            //the integer associated with each note can be accessed using the .indexOf() method 
            // MusicalNotes.indexOf("C")   returns 0
  
  
  
  
  
  
  
  function shiftArray(arr: number[]): number[] {      //function for setInversion()
    if (arr.length === 0) {
      return arr; // If the array is empty, return it as is
    }
    const firstValue = arr.shift() as number; // Remove the first value and store it as a number
    arr.push(firstValue); // Add the first value to the end of the array
    return arr;
  }
  
  

  
  function removeDuplicateStringsFromArray(arr:string[]): string[] {    //sub-function
    const result: string[] = []
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i])
        }
    }
    return result
  }
  
  
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

  return result;
}
  
  console.log(parseChordName(inputString))
  
  function addIntervalToChord(chord: number[], interval: string): number[] {      //not currently implimented yet.
    const intervalValue = intervalMap[interval];
    if (intervalValue === undefined) {
      throw new Error(`Invalid interval: ${interval}`);
    }
    return [...chord, intervalValue];
  }
  
  
  class Chord2 {
    public notes: number[] = [];
    
    constructor(public root: string, public quality: string, public extensions: string[] = []) {}  //don't HAVE to initialize yet this way
  }
  
  
  class Chord {
  
    public name: string;
    public root: string;
    public quality: string;
    public extensions: string;
    public notes: number[];
    public inversion: number;
    
    constructor(root: string, quality: string, extensions: string[] = [], inversion: number) {
  
      this.name = inputString;
      [this.root] = parseChordName(this.name);
      [,this.quality] = parseChordName(this.name);
      [,,this.extensions] = parseChordName(this.name);
      this.notes = [];
      this.inversion = inversion;
  
      setRoot(this)
      setThird(this)
      this.notes.push( (this.notes[0] +7) % 12 );   //add the fifth. Will need to be refactored to take altered and augmented chords
  
      this.notes = setInversion(this.notes,this.inversion)
      
    }
    
    printName(): void {
      console.log(this.root, this.quality);
    }
    
    getNotes(): number[] {
      return this.notes;
    }
  }
  
  
  
  
  function setRoot(chord: Chord) {                              //refactor these to be methods of the chord object
    chord.notes = [MusicalNotes.indexOf(chord.root)];
  }
  
  
  function setThird(chord: Chord) {
    if (chord.quality == "minor") {
      chord.notes.push((chord.notes[0] +3) % 12 );
    }
   else if (chord.quality == "major") {
      chord.notes.push((chord.notes[0] +4) % 12 );
    }
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
  
  
  
  
  
  //testing code
  
  
  let x = new Chord("C","major",["b9"],1)     //need to refactor this so that the argument is just "Cmajor6b9", and from that it gets its attributes
  //will look like let x = newChord(parseChord(inputString))
  //parseChord(Cmajor7b9) will return "C","major",["b9"],1
  
  
  console.log(x)
   
  
  
  
  const KeyCenter = "C"     //Keycenter should be a global variable for now. This will come from input from the user
  
  
  //end testing code
  
  
  
  
  
  

  // Data flow: 1.inputString   2. [root,quality,extensions]  gets added to the chord in the constructor



  //Need to refactor the addIntervalToChord function:
  //1. Make it accept a Chord type and an interval like b5 or something. Use the integerMap for the logic.
  
  //2. Have a decoupled function which will scan the chordName : "C Major7 #5 ", and do logic to provide the addIntervalToChord function with which intervals to add.
  
  
  
  
  
  //I think for a chord, it would be cool to be able to describe all the extensions, whatever, and then after that is defined (the set of 
  //notes in the chord is described), I can then add a suffix like (2inv, 3inv), whatever, to describe what inversion the chord is in. So 
  //a Cmajor#5 2nd inv would be the notes C E G G#, and then it would be E G G# C because of the 2ns inversion
  
