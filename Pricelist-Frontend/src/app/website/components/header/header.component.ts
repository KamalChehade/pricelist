import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DealerLoginService } from './../../services/dealer-login.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { DealerDialogComponent } from '../dealer-dialog/dealer-dialog.component';
import { environment } from '../../../../environment/environment';
import { ProductImageService } from '../../../services/product-image.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dateTime!: Date;
  query: string = '';
  suggestions: any[] = [];
  isDealerLoggedIn: boolean = false;
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  environment = environment;
  loading: boolean = false; // Add a loading flag
  showNoResults: boolean = false; // Flag to show "No results" message

  constructor(
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private dealerLoginService: DealerLoginService,
    private productImageService: ProductImageService, // Inject the ProductImageService
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dealerLoginService.isDealerLoggedIn$.subscribe(status => {
      this.isDealerLoggedIn = status;
    });
    this.dateTime = new Date();
  }

  onSearch(): void {
    if (this.query.trim() !== '') {
      this.loading = true; // Set loading to true when starting search
      this.router.navigate(['/products'], { queryParams: { query: this.query.trim() } });
      this.suggestions = [];
      this.loading = false; // Reset loading after navigation
    }
  }
  
  viewAllProducts(): void {
    if (this.query.trim() !== '') {
      this.router.navigate(['/products'], { queryParams: { query: this.query.trim() } });
    }
  }

  fetchSuggestions(): void {
    if (this.query.trim() !== '') {
      this.loading = true; // Set loading to true when starting suggestion fetch
      this.productService.getSuggestions(this.query.trim()).subscribe(suggestions => {
        this.suggestions = suggestions;
        this.fetchSuggestionImages();
        this.loading = false; // Set loading to false when suggestions are fetched
        this.showNoResults = this.suggestions.length === 0; // Set showNoResults based on suggestions length
        this.cdr.detectChanges(); // Detect changes to update the view
      }, error => {
        console.error('Error fetching suggestions:', error);
        this.loading = false; // Set loading to false in case of error
      });
    } else {
      this.suggestions = [];
      this.showNoResults = false; // Reset showNoResults when query is empty
      this.loading = false; // Reset loading when query is empty
    }
  }
  
  fetchSuggestionImages(): void {
    const observables = this.suggestions.map(suggestion =>
      this.productImageService.getProductImagesByProductId(suggestion.id).pipe(
        map(images => {
          console.log('Images:', images); // Log the images array
          if (images && images.length > 0) {
            suggestion.image = `${environment.imageUrl}/${images[0].imagePath}`; // Update suggestion with the first image
            console.log("image", suggestion.image);
          }
          console.log('Updated Suggestion:', suggestion); // Log the updated suggestion
          return images;
        })
      )
    );

    forkJoin(observables).subscribe(
      results => {
        // No need to do anything here
      },
      error => {
        console.error('Error fetching suggestion images:', error);
        this.loading = false; // Set loading to false in case of error
      }
    );
  }

  selectSuggestion(suggestion: any): void {
    this.query = suggestion.name;
    this.suggestions = [];
    this.onSearch();
  }

  closeSuggestions(): void {
    this.suggestions = [];
    this.showNoResults = false; // Ensure showNoResults is reset
  }

  openDealerDialog(): void {
    const dialogRef = this.dialog.open(DealerDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dealerLoginService.setDealerLoggedIn(true);
      }
    });
  }

  openMenu(): void {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu(): void {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }
}
