import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayRegistrationForm: boolean = true;
  isLoggedIn!: boolean; // Add a property to track login status

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  onUserAdded() {
    this.displayRegistrationForm = false;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, private router: Router ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
