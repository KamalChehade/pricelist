import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
 import { Brand } from '../../../models/brand';
import { faTrash, faPencil, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../containers/dialog/dialog.component';
 import { AddBrandComponent } from '../add-brand/add-brand.component';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BrandService } from '../../../services/brand-service.service';
import { EditBrandComponent } from '../edit-brand/edit-brand.component';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],

})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  filteredBrands: Brand[] = [];
  faTrash = faTrash;
  faPencil = faPencil;
  faSquarePlus = faSquarePlus;
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private brandService: BrandService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('BrandListComponent ngOnInit ');
    this.loadBrands();    // Subscribe to search subject
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => this.searchBrands());
  }

  loadBrands(): void {
    console.log('Loading brands...');
    this.brandService.getAllBrands().subscribe(brands => {
      this.brands = [];
      brands.forEach(brand => {
        // Use the brand image path directly from the brand object
        const brandImage = `${environment.imageUrl}${brand.brandImage}`; // Use image URL from environment variable

        this.brands.push({
          ...brand,
          brandImage: brandImage // Use the brand image path directly
        });
      });
      this.filteredBrands = this.brands;
    });
  }


  openEditDialog(brand: Brand) {
    const dialogRef = this.dialog.open(EditBrandComponent, {
      width: '400px',
      data: { id: brand.id }
    });

    dialogRef.componentInstance.updateSuccess.subscribe((success: boolean) => {
      if (success) {
        this.loadBrands();
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddBrandComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.brandAdded.subscribe((success: boolean) => {
      if (success) {
        this.loadBrands();
       }
    });
  }

  deleteBrand(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Brand',
        message: 'Are you sure you want to delete this brand?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.brandService.deleteBrand(id).subscribe(() => {
          this.brands = this.brands.filter(b => b.id !== id);
          this.filteredBrands = this.filteredBrands.filter(b => b.id !== id);
        });
      }
    });
  }

  searchBrands(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredBrands = this.brands; // Reset to show all brands if search term is empty
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredBrands = this.brands.filter(b =>
        b.name.toLowerCase().includes(searchTermLower)
      );
    }
  }

  onSearchInput(): void {
    this.searchTerm = this.searchTerm.trim();
    console.log('Search term:', this.searchTerm);
    this.searchSubject.next(this.searchTerm);
  }
}
