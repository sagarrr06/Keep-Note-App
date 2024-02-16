import { RouterService } from '../services/router.service';
import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css'],
})
export class NoteEditComponent implements OnInit {
  note: Note = { id: 0, title: '', content: '' }; // Initialize with an empty note
  noteId: number = 0;
  submitStatus: boolean = false;

  canDeactivate():
    | boolean
    | import('@angular/router').UrlTree
    | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    if (!this.submitStatus)
      this.submitStatus = confirm(
        'You have not made any changes. Are you sure you want to leave?'
      );
    return this.submitStatus;
  }

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private routerService: RouterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read the route parameter containing the note ID
    this.noteId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the note for the retrieved ID
    this.noteService.getNote(this.noteId).subscribe((note) => {
      this.note = note;
    });
  }

  editNote(): void {
    // Call the service method to update the note
    this.noteService.modifyNote(this.note).subscribe(() => {
      // Optionally, navigate back to the previous page or perform other actions
      this.routerService.navigateToNotesView();
      this.submitStatus = true;
    });
  }
}
