import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-images-dialog',
  templateUrl: './product-images-dialog.component.html',
  styleUrls: ['./product-images-dialog.component.scss']
})
export class ProductImagesDialogComponent implements AfterViewInit, OnInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  swiper: Swiper | undefined;
  faXmark = faXmark;
  isMobile: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { images: string[], index: number },
    private dialogRef: MatDialogRef<ProductImagesDialogComponent>,
    private breakpointObserver: BreakpointObserver
  ) {
    Swiper.use([Navigation, Pagination]);
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.initializeSwiper();
  }

  private initializeSwiper(): void {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      loop: true,
      initialSlide: this.data.index, // Start at the clicked image index
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    });
  }

  goBack(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
