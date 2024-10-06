import { environment } from "../../../environment/environment";
import { INavbarData } from "./helper";

/* // Define a function to fetch the items dynamically
async function fetchCategories(): Promise<any[]> {
  // Example: Fetch subcategories from an API
  const response = await fetch(`${environment.apiUrl}/categories');
  const data = await response.json();
  return data;

} */


// Define a function to fetch the items dynamically
async function fetchBrands(): Promise<any[]> {
  // Example: Fetch brands from an API
  const response = await fetch(`${environment.apiUrl}/brands`);
  const data = await response.json();
  return data;
}

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard'
  },
  {
    routeLink: 'brand-list',
    icon: 'fas fa-building',
    label: 'Brands'
  },
  {
    routeLink: 'category-list',
    icon: 'fal fa-folder-open',
    label: 'Categories',
    items: [] // Initialize empty items array for subcategories
  },
  {
    routeLink: 'logout', // Add the route link for logout
    icon: 'fas fa-sign-out-alt', // FontAwesome icon for sign out
    label: 'Sign Out'
  }
  // {
  //   routeLink: 'Subcategories',
  //   icon: 'fal fa-box-open',
  //   label: 'Product Types',
  //   items: []

  // },

];
/* fetchCategories().then(categories => {
  // Find the "Products" section in the navbar data
  const productsSection = navbarData.find(item => item.routeLink === 'Subcategories');

  // If the "Products" section is found and subcategories are fetched successfully
  if (productsSection && categories) {
    // Update the items of the "Products" section with the fetched subcategories
    productsSection.items = categories.map(category => ({
      routeLink: `bycategory/${category.id}`, // Assuming subcategory has an ID
      label: category.name // Assuming subcategory has a name
    }));
  }
}); */

fetchBrands().then(brands => {
  const categoryListSection = navbarData.find(item => item.routeLink === 'category-list');

  if (categoryListSection && brands) {
    categoryListSection.items = brands.map(brand => ({
      routeLink: `category-list/${brand.id}`, // Update routeLink to include brand ID
      label: brand.name
    }));
  }
});
