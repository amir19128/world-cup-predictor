import {
  Injectable,
  inject,
  signal,
  PLATFORM_ID,
} from '@angular/core';

import {
  isPlatformBrowser,
} from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private router =
    inject(Router);

  private http =
    inject(HttpClient);

  private platformId =
    inject(PLATFORM_ID);

  isAuthenticated =
    signal(false);

  constructor() {

    if (
      isPlatformBrowser(
        this.platformId
      )
    ) {

      this.isAuthenticated.set(
        !!localStorage.getItem(
          'token'
        )
      );

    }

  }

  register(data: any) {

    return this.http.post(
      `${environment.apiUrl}/auth/register`,
      data
    );

  }

  login(data: any) {

    return this.http.post<any>(
      `${environment.apiUrl}/auth/login`,
      data
    );

  }

  saveToken(token: string) {

    if (
      isPlatformBrowser(
        this.platformId
      )
    ) {

      localStorage.setItem(
        'token',
        token
      );

    }

    this.isAuthenticated.set(
      true
    );

  }

  getToken(): string | null {

    if (
      !isPlatformBrowser(
        this.platformId
      )
    ) {

      return null;

    }

    return localStorage.getItem(
      'token'
    );

  }

  logout() {

    if (
      isPlatformBrowser(
        this.platformId
      )
    ) {

      localStorage.removeItem(
        'token'
      );

    }

    this.isAuthenticated.set(
      false
    );

    this.router.navigate([
      '/login',
    ]);

  }

  isLoggedIn(): boolean {

    return this.isAuthenticated();

  }

}