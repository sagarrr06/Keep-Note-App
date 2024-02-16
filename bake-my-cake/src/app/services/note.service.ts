import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  note_url: string = 'http://localhost:3000/notes';
  user_url: string = ' http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.note_url);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.note_url, note);
  }

  addUser(newUser: any): Observable<any> {
    return this.http.post<any>(this.user_url, newUser);
  }

  getNote(id: number): Observable<Note> {
    const url = `${this.note_url}/${id}`;
    return this.http.get<Note>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching note with id ${id}:`, error);
        return throwError(error);
      })
    );
  }

  modifyNote(note: Note): Observable<Note> {
    const url = `${this.note_url}/${note.id}`;
    return this.http.put<Note>(url, note).pipe(
      catchError((error) => {
        console.error(`Error updating note with id ${note.id}:`, error);
        return throwError(error);
      })
    );
  }

  deleteNote(noteId: number): Observable<void> {
    const url = `${this.note_url}/${noteId}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        console.error(`Error deleting note with id ${noteId}:`, error);
        return throwError(error);
      })
    );
  }

  // ***************
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.user_url);
  }
}
