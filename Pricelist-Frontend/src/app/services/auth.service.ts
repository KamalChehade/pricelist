import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';
  redirectUrl!: string; // Add redirectUrl property

  login(username: string, password: string): boolean {
    // Perform authentication logic here
    // For simplicity, I'll just use hardcoded credentials
    if (username === 'admin' && password === '123') {
      localStorage.setItem(this.AUTH_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  isAuthenticatedUser(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
