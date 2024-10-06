import { Brand } from './brand';
import { Product } from './product';
import { Subcategory } from './subcategory';

export class Category {
  id!: number;
  name!: string;
  brandId!: number;
  brand?: Brand; // Optional property to hold the brand information
  showSubcategories: boolean = false; // Define the showSubcategories property
  subcategories: Subcategory[] = [];
  products: Product[] = []; // Define the products property

}
