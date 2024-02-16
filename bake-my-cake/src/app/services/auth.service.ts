import { Injectable } from '@angular/core';
import { NoteService } from './note.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private noteService: NoteService) { }

  isLoggedIn: boolean = false;
  

  login(loginId: string, password: string): Observable<any> {
    return this.noteService.getUsers().pipe(
      map(users => {
        const foundUser = users.find(user => user.email === loginId && user.password === password);
  
        if (foundUser) {
          // User found, set isLoggedIn to true
          this.isLoggedIn = true;
        } else {
          // User not found or incorrect credentials, set isLoggedIn to false
          this.isLoggedIn = false;
        }
  
        return this.isLoggedIn;
      }),
      catchError(error => {
        console.error('Error during login:', error);
        this.isLoggedIn = false;
        return of(false); // Return an observable with false in case of an error
      })
    );
  }

  // login(loginId: string, password: string) {
   
  //   if (loginId === 'welcome@kn' && password === 'kn@2023') {
  //     this.isLoggedIn = true;
  //   }
  // }

  logout() {
    this.isLoggedIn = false;
  }
}
