export interface Promo {
  id?: number;
  productId?: number;
  promoType: string;
  moq?: number;
  promoPrice?: number;
  additionalProductId?: number | null;
  additionalProductQuantity?: number;
  giftProductId?: number  | null;
  giftProductName?: string;
  additionalProductName?: string;
  description?: string; // Add the description field
}

