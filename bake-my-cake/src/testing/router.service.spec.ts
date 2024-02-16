import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoteViewComponent } from 'src/app/note-view/note-view.component';
import { SearchComponent } from 'src/app/search/search.component';
import { NoteService } from 'src/app/services/note.service';

import { RouterService } from 'src/app/services/router.service';
import { NoteServiceStub } from './noteServiceStub';

describe('RouterService', () => {
  let service: RouterService;
  let noteService: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      providers: [
        { provide: NoteService, useClass: NoteServiceStub }
      ]
    });
    service = TestBed.inject(RouterService);
    noteService = TestBed.inject(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain `navigateToNotesView()` method which navigates to notes view when called', fakeAsync(() => {
    const fixture = TestBed.createComponent(NoteViewComponent);
    service.navigateToNotesView();
    tick();
    expect((fixture.nativeElement as HTMLElement).innerHTML).toContain("app-search");
  }));
});
