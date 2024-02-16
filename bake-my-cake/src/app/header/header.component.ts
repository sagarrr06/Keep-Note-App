import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navBrand = 'Keep Note';
  isLoggedIn!: boolean; // Add a property to track login status
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  openRegistrationForm(): void {
    // Navigate to the registration route when the button is clicked
    this.router.navigate(['/register-user']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
