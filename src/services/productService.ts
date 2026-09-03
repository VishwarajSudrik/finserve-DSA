import { LOAN_PRODUCTS } from '../config/products';
import type { LoanProduct } from '../types/product';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

class ProductService {
  private products: LoanProduct[] = [...LOAN_PRODUCTS];

  async getProducts(): Promise<LoanProduct[]> {
    await delay();
    return this.products;
  }

  async getProductBySlug(slug: string): Promise<LoanProduct | undefined> {
    await delay();
    return this.products.find((p) => p.slug === slug || p.id === slug);
  }

  async updateProduct(product: LoanProduct): Promise<LoanProduct> {
    await delay();
    const idx = this.products.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      this.products[idx] = product;
    }
    return product;
  }
}

export const productService = new ProductService();
