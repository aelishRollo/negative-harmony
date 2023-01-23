// C = 0, C# = 1, D = 2, etc.





enum MusicalNotes {
    "C" = 0,
    "CSharp" = 1,
    "D" = 2,
    "DSharp" = 3,
    "E" = 4,
    "F" = 5,
    "FSharp" = 6,
    "G" = 7,
    "GSharp" = 8,
    "A" = 9,
    "ASharp" = 10,
    "B" = 11
}


console.log(MusicalNotes[10])


const Chord = {
  letterName: "A",
  chordQuality: "minor",
  printName: function() {
    console.log(this.letterName)
    console.log(this.chordQuality)
  }
}


Chord.printName()

console.log("Here's the note number of G#: ")
console.log(MusicalNotes["GSharp"])

//my next step would just be to start developing a method on the Chord object which returns an array of notes based on its letterName and Quality. A getNotes method

