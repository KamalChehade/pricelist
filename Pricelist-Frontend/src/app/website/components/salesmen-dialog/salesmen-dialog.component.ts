import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-salesmen-dialog',
  templateUrl: './salesmen-dialog.component.html',
  styleUrls: ['./salesmen-dialog.component.scss']
})
export class SalesmenDialogComponent {
  environment = environment; // Assign environment variable
  constructor(@Inject(MAT_DIALOG_DATA) public data: { productName: string }) {
   }
  openWhatsApp() {
    const message = `I am interested in buying the ${this.data.productName}`;
    const whatsappAPI = `https://wa.me/96171143637?text=${encodeURIComponent(message)}`;
    window.open(whatsappAPI);
  }
}
