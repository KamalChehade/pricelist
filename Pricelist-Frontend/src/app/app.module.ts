import { HomePageComponent } from './website/components/home-page/home-page.component';
import { WebsiteLayoutComponent } from './website/website-layout/website-layout.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardModule, SidebarModule, ListGroupModule, CardComponent, CardBodyComponent, CardFooterComponent, CardGroupComponent } from '@coreui/angular';
import { HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryService } from './services/category.service';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryDialogComponent } from './components/category/edit-category/edit-category-dialog.component';
import { IconSetService } from '@coreui/icons-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BodyComponent } from './containers/body/body.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';
import { DialogComponent } from './containers/dialog/dialog.component';
import { SublevelMenuComponent } from './containers/sidenav/sublevel-menu.component';
import { SubcategoryListComponent } from './components/subcategory/subcategory-list/subcategory-list.component';
import { EditSubcategoryDialogComponent } from './components/subcategory/edit-subcategory-dialog/edit-subcategory-dialog.component';
import { AddSubcategoryDialogComponent } from './components/subcategory/add-subcategory-dialog/add-subcategory-dialog.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { LoadingScreenComponent } from './containers/loading-screen/loading-screen.component';
import { LoginComponent } from './components/login/login.component';
import { AvatarModule } from '@coreui/angular';
import { BreadcrumbModule } from '@coreui/angular';
import { FooterModule } from '@coreui/angular';
import { DropdownModule } from '@coreui/angular';
import { GridModule } from '@coreui/angular';
import { HeaderModule } from '@coreui/angular';
import { NavModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { InputGroupComponent } from '@coreui/angular';
import { FormModule } from '@coreui/angular';
import { UtilitiesModule } from '@coreui/angular';
import { ButtonGroupModule } from '@coreui/angular';
import { SharedModule } from '@coreui/angular';
import { TabsModule } from '@coreui/angular';
import { ProgressModule } from '@coreui/angular';
import { BadgeModule } from '@coreui/angular';
import { InputTextModule } from 'primeng/inputtext';
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';
import { AddBrandComponent } from './components/brands/add-brand/add-brand.component';
import { EditBrandComponent } from './components/brands/edit-brand/edit-brand.component';
import { AddProductDialogComponent } from './components/products/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './components/products/edit-product-dialog/edit-product-dialog.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HeaderComponent } from './website/components/header/header.component';
import { BrandNavComponent } from './website/components/brand-nav/brand-nav.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SubcategoryPageComponent } from './website/components/subcategory-page/subcategory-page.component';
import { ProductPageComponent } from './website/components/product-page/product-page.component';
import { NgxEditorModule } from 'ngx-editor';
import { PaginatorModule } from 'primeng/paginator';

import {
  CardImgDirective,
  CardTextDirective,
  CardTitleDirective,
  ColComponent,
  GutterDirective,
  RowComponent,
  TextColorDirective
} from '@coreui/angular';
import { ProductImageGalleryDialogComponent } from './components/products/product-Images/product-image-gallery-dialog/product-image-gallery-dialog.component';
import { AddProductImagesDialogComponent } from './components/products/product-Images/add-product-images-dialog/add-product-images-dialog.component';
import { EditProductImagesDialogComponent } from './components/products/product-Images/edit-product-images-dialog/edit-product-images-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdvertisementImageDialogComponent } from './website/components/product-page/advertisement-image-dialog/advertisement-image-dialog.component';
import { DealerDialogComponent } from './website/components/dealer-dialog/dealer-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
 import { ProductImagesDialogComponent } from './website/components/product-page/product-images-dialog/product-images-dialog.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminModule } from './admin/admin.module';
import { LogoutComponent } from './admin-layout/logout/logout.component';
import { LogoutDialogComponent } from './admin-layout/logout/logout-dialog/logout-dialog.component';
import { OneProductComponent } from './website/components/product-page/one-product/one-product.component';
import { EditorModule } from 'primeng/editor';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner.component';
import { SalesmenDialogComponent } from './website/components/salesmen-dialog/salesmen-dialog.component';
import { FooterComponent } from './website/components/footer/footer.component';
import { LoadingSpinnerComponent } from './website/components/loading-spinner/loading-spinner.component';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';
import { PromoDialogComponent } from './components/products/promo-dialog/promo-dialog.component';
import { AddDialogComponent } from './components/products/promo-dialog/add-dialog/add-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditPromoDialogComponent } from './components/products/promo-dialog/edit-promo-dialog/edit-promo-dialog.component';
import { ProductDescriptionComponent } from './website/components/product-page/product-description/product-description.component';
import { TabMenuModule } from 'primeng/tabmenu';
 import { BreadcrumbComponent } from './website/breadcrumb/breadcrumb.component';
import { ProductDescriptionDialogComponent } from './website/components/product-page/product-description-dialog/product-description-dialog.component';

const APP_CONTAINERS = [
  BodyComponent,
  SidenavComponent,
  DialogComponent,
  SublevelMenuComponent,

];

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryDialogComponent,
    ...APP_CONTAINERS,
    SubcategoryListComponent,
    EditSubcategoryDialogComponent,
    AddSubcategoryDialogComponent,
    ProductListComponent,
     LoadingScreenComponent,
    LoginComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,
    BrandListComponent,
    AddBrandComponent,
    EditBrandComponent,
    HomePageComponent,
    WebsiteLayoutComponent,
    AdminLayoutComponent,
    HeaderComponent,
    BrandNavComponent,
    SubcategoryPageComponent,
     ProductPageComponent,
    ProductImageGalleryDialogComponent,
    AddProductImagesDialogComponent,
    EditProductImagesDialogComponent,
    AdvertisementImageDialogComponent,
    DealerDialogComponent,
    AdminLayoutComponent,
    ProductImagesDialogComponent,
    LogoutComponent,
    LogoutDialogComponent,
    OneProductComponent,
    CustomSpinnerComponent,
    SalesmenDialogComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    PromoDialogComponent,
    AddDialogComponent,
    EditPromoDialogComponent,
    ProductDescriptionComponent,
    BreadcrumbComponent,
    ProductDescriptionDialogComponent,

  ],
  imports: [
     TabMenuModule,
    MatPaginatorModule,
    PaginatorModule,
    MatAutocompleteModule,
    MatSelectModule,
     PinchZoomModule,
     BrowserAnimationsModule,
     BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
     MatSnackBarModule,
    MatDialogModule,
    CardComponent,
    CardBodyComponent,
    EditorModule,
    CardFooterComponent,
    AdminRoutingModule,
    CardGroupComponent,
    AngularEditorModule,
    CardImgDirective,
    RouterModule,
    CardTextDirective,
    CardTitleDirective,
    ColComponent,
    GutterDirective,
    RowComponent,
    TextColorDirective,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FileUploadModule,
    MatInputModule,
    DialogModule,
    ButtonModule,
    CommonModule,
    CardModule,
    ListGroupModule,
    TableModule,
    FontAwesomeModule,
    ConfirmPopupModule,
    ToastModule,
    MatTooltipModule,
    MatSlideToggleModule,
    SidebarModule,
    AvatarModule,
    BreadcrumbModule,
     DropdownModule,
    GridModule,
    HeaderModule,
    NavModule,
    InputGroupComponent,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    SharedModule,
    TabsModule,
    ProgressModule,
    BadgeModule,
    InputTextModule,
  ],
  providers: [
    CategoryService,
    IconSetService,
    ConfirmationService,
    MessageService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    // {
    //   provide: HTTP_INTERCEPTORS, // Provide the interceptor
    //   useClass: AuthInterceptor,
    //   multi: true
    // }

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA here

  bootstrap: [AppComponent]

})
export class AppModule { }
interface NgxSpinnerConfig {
  type?: string;
}
