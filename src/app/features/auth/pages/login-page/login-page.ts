import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private authService =
    inject(AuthService);

  private router =
    inject(Router);

  form = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ),

    password: new FormControl(
      '',
      Validators.required
    ),
  });

  login() {

    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(
        this.form.getRawValue()
      )
      .subscribe({
        next: response => {

          this.authService.saveToken(
            response.token
          );

          this.router.navigate([
            '/matches',
          ]);
        },

        error: error => {
          console.error(
            error
          );

          alert(
            'Login Failed'
          );
        },
      });
  }
}