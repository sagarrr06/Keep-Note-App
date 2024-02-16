import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css'],
})
export class NoteViewComponent implements OnInit {
  notes: Note[] = [];
  // searchResults: Note[] = [];
  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (error) => {
        alert('Failed to Fetch Notes Due to Server Error !!');
      },
    });
  }

  receiveSearchResults(searchText: string) {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        if (searchText || searchText !== '') {
          this.notes = data.filter((note) =>
            note.title?.toLowerCase().includes(searchText.toLowerCase())
          );
        } else {
          this.notes = data;
        }
      },
      error: (error) => {
        alert('Failed to Fetch Notes Due to Server Error !!');
      },
    });
  }

  onNoteAdded(note: Note) {
    this.notes.push(note);
  }

  selectedNote: Note | null = null; // Track the selected note

  // Function to handle selecting a note
  selectNote(note: Note) {
    this.selectedNote = note;
  }

  deleteNote(note: Note) {
    // Handle the delete operation here using the note received from NoteComponent
    const index = this.notes.findIndex((n) => n === note);

    if (index !== -1) {
      this.notes.splice(index, 1);
      console.log('Note deleted from the view:', note);
    } else {
      console.error('Note not found in the array.');
    }
  }
  
}
