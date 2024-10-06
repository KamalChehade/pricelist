import { SafeHtml } from "@angular/platform-browser";
import { Promo } from "./models/promo";

export interface Product {
  id: number;
  name: string;
  description: SafeHtml;
  price: number;
  dealerPrice: number;
  categoryId?: number;
  subcategoryId?: number;
  thumbnailImage?: string;
  isNew?: boolean;
  onDiscount?: boolean;
  discountPrice?: number;
  hovered?: boolean;
  moq?: boolean;
  status?: boolean;
  moqQuantity?: number;
  moqPrice?: number;
  images?: string[];
  updatePriceFlag?: boolean;
  showAdvertisementButton?: boolean;
  promos?: Promo[]; // Define promos as optional
  discountPercentage?: number ;
  youtubeLink?: string; // Add this line if not already present

 }
