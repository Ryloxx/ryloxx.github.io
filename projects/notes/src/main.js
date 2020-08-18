import NotesView from "./view.js";
import InputValidation from "./inputValidation.js";
const addNoteInput = document.createElement("textarea");
const addNoteButton = document.createElement("button");
const container = document.createElement("span");
container.id = "noteAddPane";
addNoteInput.id = "newNoteContent";
addNoteButton.textContent = "Add Note";
container.append(addNoteInput, addNoteButton);
document.querySelector("#notesDisplay").appendChild(container);
const notesView = new NotesView.NoteListView("#notesDisplay");
const inputField = InputValidation.fieldFact(
  "New Note",
  "newNoteContent",
  undefined,
  [/.+/],
  undefined,
  "Must contain at least 1 character",
  undefined
);
addNoteButton.addEventListener("click", (event) => {
  if (InputValidation.validateField(inputField)) {
    notesView.addNode(NotesView.NoteListView.noteNodeFact(addNoteInput.value));
    inputField.resetField();
  }
});
window.addEventListener("unload", (event) => {
  localStorage.setItem("savedNotes", JSON.stringify(notesView.getNotes()));
});
const pastNotesString = localStorage.getItem("savedNotes");
if (pastNotesString) {
  let pastNotes = JSON.parse(pastNotesString);
  pastNotes.forEach((note) => {
    notesView.addNode(NotesView.NoteListView.noteNodeFact(note.content));
  });
}
