console.clear();
var inputString = "aminor"; //this will be input from the user, from a textbox or something
var KeyCenter = "C"; //Keycenter should be a global variable for now. This will come from input from the user. Probably a form
function sum(a, b) {
    return a + b;
}
module.exports = sum;
var intervalMap = {
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
var MusicalNotes = ["c", "csharp", "d", "dsharp", "e", "f", "fsharp", "g", "gsharp", "a", "asharp", "b"];
//the integer associated with each note can be accessed using the .indexOf() method 
// MusicalNotes.indexOf("c")   returns 0 
function removeDuplicateStringsFromArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}
//console.log(parseChordName('Cmajor7b9#11')) returns ["C", "major7", "b9#11"]
function parseChordName(chordName) {
    var result = ['', '', ''];
    var regex = /^([A-Ga-g][#b]?)([^#b\s]*\d*)(.*)$/;
    var matches = chordName.match(regex);
    if (matches) {
        result[0] = matches[1]; // root note
        result[1] = matches[2]; // chord type
        result[2] = matches[3]; // extensions or alterations
    }
    return result; //returns [root, chord type, extensions]
}
var Chord2 = /** @class */ (function () {
    function Chord2(root, quality, extensions) {
        if (extensions === void 0) { extensions = []; }
        this.root = root;
        this.quality = quality;
        this.extensions = extensions;
        this.notes = [];
    } //don't HAVE to initialize yet this way
    return Chord2;
}());
var Chord = /** @class */ (function () {
    function Chord(root, quality, extensions, inversion) {
        var _a, _b;
        this.name = inputString;
        this.root = parseChordName(this.name)[0]; //using destructuring assignments to get the 1st, 2nd, and 3rd return values of the function      
        _a = parseChordName(this.name), this.quality = _a[1];
        _b = parseChordName(this.name), this.extensions = _b[2];
        this.notes = [];
        this.inversion = inversion;
        setRoot(this);
        setThird(this);
        setFifth(this);
        //this.notes.push( (this.notes[0] +7) % 12 );   //add the fifth. Will need to be refactored to take altered and augmented chords
        this.notes = setInversion(this.notes, this.inversion);
    }
    Chord.prototype.printName = function () {
        console.log(this.root, this.quality);
    };
    Chord.prototype.getNotes = function () {
        return this.notes;
    };
    return Chord;
}());
function findFifth(note) {
    var indexOfFifth = (MusicalNotes.indexOf(note) + 7) % 12;
    var fifth = MusicalNotes[indexOfFifth];
    return fifth;
}
;
function getIntervalFromKeyCenter(note) {
    var noteAsNumber = MusicalNotes.indexOf(note);
    var keyCenterAsNumber = MusicalNotes.indexOf(KeyCenter);
    var normalizedNote = noteAsNumber % 12;
    0x10;
    var interval;
    if (normalizedNote >= keyCenterAsNumber) {
        interval = normalizedNote - keyCenterAsNumber;
    }
    else {
        interval = 12 + (normalizedNote - keyCenterAsNumber);
    }
    return interval;
}
;
function invertNote(note) {
    var result = '';
    var tempNumber = 0;
    var interval = getIntervalFromKeyCenter(note);
    var intervalToResult = [7, 6, 5, 4, 3, 2, 1, 12, 11, 10, 9, 8];
    tempNumber = intervalToResult[interval];
    result = MusicalNotes[tempNumber];
    if (result == undefined) { //inelegant solution to an edge case. But hey, it works
        result = note;
    }
    ;
    return result;
}
;
//Explanation of which chords map to what
//major <---> minor   Root is inverted fifth
//major7 <---> minor6   Root is inverted fifth
function invertChord(chord) {
    var root = chord.root;
    console.log(root);
    console.log(findFifth(root));
    console.log(findFifth("c"));
    var newRoot = invertNote(findFifth(root));
    var newQuality = invertChordQuality(chord.quality);
    return [newRoot, newQuality];
}
;
function invertChordQuality(quality) {
    var result = '';
    if (quality == "major") {
        result = "minor";
    }
    if (quality == "minor") {
        result = "major";
    }
    if (quality == "major7") {
        result = "minorb6";
    }
    if (quality == "minorb6") {
        result = "major7";
    }
    if (quality == "minor7") {
        result = "major6";
    }
    if (quality == "major6") {
        result = "minor7";
    }
    if (quality == "7") {
        result = "minor6";
    }
    if (quality == "minor6") {
        result = "7";
    }
    if (quality == "major9") {
        result = "minor9";
    }
    if (quality == "minor9") {
        result = "major9";
    }
    if (quality == "sus2") {
        result = "sus4";
    }
    if (quality == "sus4") {
        result = "sus2";
    }
    if (quality == "halfdiminished") {
        result = "7";
    }
    if (quality == "diminished") {
        result = "diminished";
    }
    return result;
}
;
function setRoot(chord) {
    chord.notes = [MusicalNotes.indexOf(chord.root)];
}
function setThird(chord) {
    if (chord.quality.includes("minor")) {
        chord.notes.push((chord.notes[0] + 3) % 12); //add the minor third to chord.notes
    }
    else if (chord.quality.includes("major")) {
        chord.notes.push((chord.notes[0] + 4) % 12); //add the major third to chord.notes
    }
}
function setFifth(chord) {
    chord.notes.push((chord.notes[0] + 7) % 12);
}
;
function shiftArray(arr) {
    if (arr.length === 0) {
        return arr; // If the array is empty, return it as is
    }
    var firstValue = arr.shift(); // Remove the first value and store it as a number
    arr.push(firstValue); // Add the first value to the end of the array
    return arr;
}
function setInversion(notes, inversion) {
    if (inversion >= notes.length) {
        throw new Error("Invalid inversion value. Inversion value cannot be greater than or equal to the number of notes in your chord.");
    }
    ;
    for (var i = 0; i < inversion; i++) {
        notes = shiftArray(notes);
    }
    return notes;
}
function invertNotesAroundKeyCenter(chord) {
    var result = [];
    for (var i = 0; i < chord.notes.length; i++) {
        console.log(chord.notes[i]);
    }
}
;
function main() {
    var x = new Chord(parseChordName(inputString)[0], parseChordName(inputString)[1], parseChordName(inputString)[2], 0);
    console.log(x);
    console.log(invertChord(x));
}
main();
//still need to make it so capitalization doesn't matter
//the main priority right now is to actually sit down at the piano, play each chord type, and make a chart of the inversion for myself
//on paper. Then I can feed that information into my program.
//I want to focus on getting every chord type done for each interval, in sequence. That way I won't have to go back and forth. It would be too chaotic and messy
