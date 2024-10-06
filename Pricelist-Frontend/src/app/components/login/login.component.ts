import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  environment = environment;
  backgroundImageUrl = `${environment.assetUrl}/img/BG.webp`;

  constructor(private authService: AuthService, private router: Router) {}

  async login(): Promise<void> {
    if (!this.username || !this.password) {
      this.showErrorMessage("Username and password are required.");
      return;
    }

    try {
      const loggedIn = await this.authService.login(this.username, this.password);
      if (loggedIn) {
        this.router.navigate(['/admin']);
      } else {
        this.showErrorMessage("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      this.showErrorMessage("An error occurred during login.");
    }
  }

  showErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
