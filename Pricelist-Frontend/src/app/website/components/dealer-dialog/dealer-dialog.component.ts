import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DealerLoginService } from '../../services/dealer-login.service';

@Component({
  selector: 'app-dealer-dialog',
  templateUrl: './dealer-dialog.component.html',
  styleUrls: ['./dealer-dialog.component.scss']
})
export class DealerDialogComponent {
  password: string = '';
  isDealerLoggedIn: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DealerDialogComponent>,
    private _snackBar: MatSnackBar,
    private dealerLoginService: DealerLoginService // Inject DealerLoginService
  ) {
    // Check if the user is already logged in as a dealer
    this.isDealerLoggedIn = this.dealerLoginService.getDealerLoggedIn();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  login(): void {
    // Check if the user is already logged in as a dealer
    if (this.isDealerLoggedIn) {
      // User is already logged in as a dealer
      this.openSnackBar('You are already logged in as a dealer', 'Close');
      this.dialogRef.close(true);
    } else {
      // Check if the entered password is correct
      if (this.password === 'dealer123' ||'Dealer123') {
        // Password is correct, close the dialog and show success snackbar
        this.dialogRef.close(true);
        this.dealerLoginService.setDealerLoggedIn(true); // Set dealer login status
        this.openSnackBar('Dealer password is correct', 'Close');
      } else {
        // Password is incorrect, close the dialog and show error snackbar
        this.dialogRef.close();
        this.openSnackBar('Dealer password is incorrect', 'Close');
      }
    }
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
    });
  }
}
