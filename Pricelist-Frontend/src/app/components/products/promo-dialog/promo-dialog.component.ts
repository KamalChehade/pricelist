import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faSquarePlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
 import { PromoService } from '../../../services/promo.service';
import { ProductService } from '../../../services/product.service';
 import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Promo } from '../../../models/models/promo';
import { Product } from '../../../models/product';
import { DialogComponent } from '../../../containers/dialog/dialog.component';
import { EditPromoDialogComponent } from './edit-promo-dialog/edit-promo-dialog.component';

@Component({
  selector: 'app-promo-dialog',
  templateUrl: './promo-dialog.component.html',
  styleUrls: ['./promo-dialog.component.scss']
})
export class PromoDialogComponent implements OnInit {
  productName: string;
  faSquarePlus = faSquarePlus;
  faPencil = faPencil;
  faTrash = faTrash;
  promos: Promo[] = [];
  productId: number;

  constructor(
    public dialogRef: MatDialogRef<PromoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private promoService: PromoService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.productName = '';
    this.productId = this.data.productId; // Initialize productId from MAT_DIALOG_DATA
  }

  ngOnInit(): void {
    this.productName = this.data.productName;
    this.fetchPromos();
  }

  fetchPromos(): void {
    const productId = this.data.productId;
    this.promoService.getProductPromos(productId).subscribe(
      (promos: Promo[]) => {
        this.promos = promos;
        this.fetchProductDetails(); // Fetch product details after fetching promos
      },
      (error) => {
        console.error('Error fetching promos:', error);
      }
    );
  }

  fetchProductDetails(): void {
    // Filter out undefined values from productIds array
    const additionalProductIds = this.promos.map(promo => promo.additionalProductId).filter(id => id !== undefined) as number[];
    const giftProductIds = this.promos.map(promo => promo.giftProductId).filter(id => id !== undefined) as number[];

    const productIds: number[] = [
      ...additionalProductIds,
      ...giftProductIds
    ];

    // Fetch products by IDs
    this.productService.getProductsByIds(productIds).subscribe(
      (products: Product[]) => {
        // Map product names to promos
        this.promos.forEach(promo => {
          const additionalProduct = products.find(p => p.id === promo.additionalProductId);
          if (additionalProduct) {
            promo.additionalProductName = additionalProduct.name; // Assuming you have additionalProductName in Promo model
          }
          const giftProduct = products.find(p => p.id === promo.giftProductId);
          if (giftProduct) {
            promo.giftProductName = giftProduct.name; // Assuming you have giftProductName in Promo model
          }
        });
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openAddPromoDialog(productId: number): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '700px', // Adjust width as needed
      data: { productId } // Pass productId to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.refreshPromoList();
      }
    });
  }




  openEditPromoDialog(promo: Promo): void {
    const dialogRef = this.dialog.open(EditPromoDialogComponent, {
      width: '700px', // Adjust width as needed
      data: { promo } // Pass the promo object to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.refreshPromoList();
      }
    });
  }

  deletePromo(promo: Promo) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Promo',
        message: 'Are you sure you want to delete this promo?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        if (promo.id !== undefined) {
          this.promoService.deletePromo(promo.id).subscribe(() => {
            // Optional: Implement logic after successful deletion
            console.log('Promo deleted successfully.');
            // Update promos list locally without waiting for fetchPromos()
            this.promos = this.promos.filter(p => p.id !== promo.id);
          }, (error) => {
            console.error('Error deleting promo:', error);
          });
        } else {
          console.error('Promo ID is undefined, cannot delete.');
        }
      }
    });
  }

  refreshPromoList(): void {
    const productId = this.data.productId;
    this.promoService.getProductPromos(productId).subscribe(
      (promos: Promo[]) => {
        this.promos = promos;
        this.fetchProductDetails(); // Fetch product details after fetching promos
      },
      (error) => {
        console.error('Error fetching updated promos:', error);
      }
    );
  }
}

