import { Component, inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  private authService =
    inject(AuthService);

  form = new FormGroup({
    name: new FormControl(
      '',
      Validators.required
    ),

    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ),

    password:
      new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ),
  });

  register() {

    if (this.form.invalid) {
      return;
    }

    this.authService
      .register(
        this.form.getRawValue()
      )
      .subscribe({
        next: response => {
          console.log(
            response
          );

          alert(
            'Registered'
          );
        },

        error: error => {
          console.error(
            error
          );
        },
      });
  }
}