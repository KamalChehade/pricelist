import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLayoutComponent } from './website/website-layout/website-layout.component';
import { HomePageComponent } from './website/components/home-page/home-page.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryDialogComponent } from './components/category/edit-category/edit-category-dialog.component';
import { SubcategoryListComponent } from './components/subcategory/subcategory-list/subcategory-list.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { EditSubcategoryDialogComponent } from './components/subcategory/edit-subcategory-dialog/edit-subcategory-dialog.component';
import { SubcategoryPageComponent } from './website/components/subcategory-page/subcategory-page.component';
import { ProductPageComponent } from './website/components/product-page/product-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
 import { OneProductComponent } from './website/components/product-page/one-product/one-product.component';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner.component';
import { ProductDescriptionComponent } from './website/components/product-page/product-description/product-description.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      {
        path: 'subcategory/:categoryId',
        component: SubcategoryPageComponent
      },
      { path: 'product-card/:id', component: OneProductComponent },
      {
        path: 'product',
        component: ProductListComponent
      },
      {
        path: 'loading',
        component: CustomSpinnerComponent
      },
      {
        path: 'product/:categoryId/:subcategoryId',
        component: ProductPageComponent
      },
      {
        path: 'product/:categoryId',
        component: ProductPageComponent
      },
      { path: 'products', component: ProductPageComponent },
      {
        path: 'product-description/:id', // Define the route for product description with ID parameter
        component: ProductDescriptionComponent
      },
      {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full',
      }
    ]
  },
  { path: 'login', component: LoginComponent },
   {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
