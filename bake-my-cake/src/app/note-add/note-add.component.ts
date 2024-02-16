import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css'],
})
export class NoteAddComponent implements OnInit {
  note: Note = {};

  @Output()
  noteAdded: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private noteService: NoteService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  showAddNote = false;
  toggleAddNote() {
    this.showAddNote = !this.showAddNote;
    // Clear note data when toggling to hide the form
    if (!this.showAddNote) {
      this.note = { title: '', content: '' };
    }
  }
  onSubmit() {
    if (this.note.title) {
      this.noteService.addNote(this.note).subscribe({
        next: (data) => {
          this._snackBar.open('Feedback submitted successfully', 'Success', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
          this.noteAdded.emit(this.note);
          this.note = {};
        },
        error: (error) => {
          alert('Failed to Add Note Due to Server Error !!');
        },
      });
    }
  }
}
