import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from 'src/app/note/note.component';

import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { NoteService } from 'src/app/services/note.service';
import { NoteServiceStub } from './noteServiceStub';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActivatedRouteStub } from './activatedRouteStub';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      imports: [ MatCardModule, MatIconModule, RouterModule ],
      providers: [
        { provide: NoteService, useClass: NoteServiceStub }, 
        { provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain link to navigate to note-edit view',()=> {
    const cardElement = fixture.debugElement.query(By.css("mat-card"));//.nativeElement as HTMLElement;
    component.hovered=true;
    fixture.detectChanges();
    expect( (cardElement.nativeElement as HTMLElement).innerHTML).toContain('router-link');    
  });
});
