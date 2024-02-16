import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NoteService } from '../services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  displayRegistrationForm: boolean = true;
  @Output() userAdded: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: [''],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).*$'),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        gender: [''],
        age: [0, [Validators.required, this.ageValidator]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
          ],
        ],
        phone: ['', [Validators.pattern('^[7-9][0-9]{9}$')]],
        address: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          zipCode: ['', [Validators.pattern('^[0-9]{5,6}$')]],
        }),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  ageValidator(control: AbstractControl): ValidationErrors | null {
    const ageValue = parseInt(control.value);
    if (isNaN(ageValue) || ageValue < 18) {
      return { invalidAge: true };
    }
    return null;
  }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Create a user object from the form values
      const newUser = this.registerForm.value;

      this.noteService.addUser(newUser).subscribe({
        next: (response) => {
          this.userAdded.emit();
          console.log('New user added:', response);
          this._snackBar.open('New user added', 'Success', {
            duration: 3000, // Snackbar display duration in milliseconds
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
          this.router.navigate(['/login'])
        },
        error: (error) => {
          console.error('Error adding new user:', error);
          // Handle error responses
        },
      });
    } else {
      console.log('Invalid form details');
    }
  }

  resetForm() {
    this.registerForm.reset(); // Resets the form
  }
}
