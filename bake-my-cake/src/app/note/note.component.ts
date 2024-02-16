import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../models/note';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  @Input() note?: Note;
  @Input() selectedNote: Note | null = null; // Accept the selected note as input

  @Output() noteSelected: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() deleteNote: EventEmitter<Note> = new EventEmitter<Note>();
  displayIcons = false; // Flag to control the visibility of icons
  formattedReminderDate: string | null = null;

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.formattedReminderDate = this.datePipe.transform(
      this.note?.reminderDate,
      'MM/dd/yyyy hh:mm a'
    );
  }

  onClick() {
    if (this.note) {
      this.noteSelected.emit(this.note);
      this.displayIcons = !this.displayIcons;
    }
  }
  showActions() {
    return this.selectedNote === this.note;
  }
  // Define your functions: addComment, edit, delete, setReminder
  addComment(note: Note | undefined) {
    if (note) {
      // Logic to add a comment to the selected note
    }
  }

  edit(note: Note | undefined) {
    if (note) {
      // Logic to add a comment to the selected note
      this.router.navigate(['/notes', note.id]);
    }
  }

  delete(note: Note | undefined): void {
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (confirmDelete && note) {
      console.log('Deleting note with id:', note.id);
      this.noteService.deleteNote(note.id as number).subscribe(() => {
        // You may choose to navigate or perform other actions after deletion
        this.deleteNote.emit(note);
        this.router.navigate(['/notes']);
      });
    }
  }

  setReminder(note: Note | undefined) {
    if (note) {
      // Logic to add a comment to the selected note
    }
  }
}
