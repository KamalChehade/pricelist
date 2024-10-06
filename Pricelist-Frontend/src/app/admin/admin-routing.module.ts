import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { BrandListComponent } from '../components/brands/brand-list/brand-list.component';
import { AuthGuard } from '../guards/auth.guard';
import { CategoryListComponent } from '../components/category/category-list/category-list.component';
import { AddCategoryComponent } from '../components/category/add-category/add-category.component';
import { EditCategoryDialogComponent } from '../components/category/edit-category/edit-category-dialog.component';
import { EditSubcategoryDialogComponent } from '../components/subcategory/edit-subcategory-dialog/edit-subcategory-dialog.component';
import { SubcategoryListComponent } from '../components/subcategory/subcategory-list/subcategory-list.component';
import { ProductListComponent } from '../components/products/product-list/product-list.component';
import { ProductPageComponent } from '../website/components/product-page/product-page.component';
import { LogoutComponent } from '../admin-layout/logout/logout.component';
import { LogoutDialogComponent } from '../admin-layout/logout/logout-dialog/logout-dialog.component';
// Import other admin components


const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect /admin to login
      { path: 'brand-list', component: BrandListComponent },
      { path: 'category-list/:brandId', component: CategoryListComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'edit-category/:id', component: EditCategoryDialogComponent },
      { path: 'edit-subcategory/:id', component: EditSubcategoryDialogComponent },
      { path: 'subcategory-list', component: SubcategoryListComponent },
      { path: 'bycategory/:id', component: SubcategoryListComponent },
      { path: 'products/:subcategoryId', component: ProductListComponent },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'logout', component: LogoutComponent },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
