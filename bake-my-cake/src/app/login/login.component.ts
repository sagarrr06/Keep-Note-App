import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async validateAdmin(event: Event) {
    event.preventDefault();
  
    if (this.loginForm.valid) {
      const loginId = this.loginForm.get('loginId')!.value;
      const password = this.loginForm.get('password')!.value;
  
      this.authService.login(loginId, password).subscribe((isLoggedIn: boolean) => {
        console.log(isLoggedIn);
  
        if (isLoggedIn) {
          this.routerService.navigateToNotesView();
        } else {
          // Handle unsuccessful login
          alert('Invalid credentials. Please try again.');
        }
      });
    } else {
      alert('Please enter Email and Password first!');
    }
  }
}
