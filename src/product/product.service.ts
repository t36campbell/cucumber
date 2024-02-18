import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Product, ProductFilter, ProductSort } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  async create(product: Product): Promise<Product> {
    const id = uuid();
    const index = this.products.length; // was length, but becomes last index after push
    this.products.push({ id, ...product });
    return this.products.at(index);
  }

  async get(id: string): Promise<Product> {
    return this.products.find((p) => p.id === id);
  }

  async update(id: string, product: Product): Promise<Product> {
    const replace = 1;
    const index = this.products.findIndex((p) => p.id === id);
    this.products.splice(index, replace, { id, ...product });
    return this.products.at(index);
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
  }

  private compare(
    key: ProductSort,
    asc: boolean,
    a: Product,
    b: Product,
  ): number {
    if (key === 'price') {
      return asc ? a.price - b.price : b.price - a.price;
    }

    const valueA: string = a[key];
    const valueB: string = b[key];

    return asc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  }

  async list(
    sort: ProductSort,
    asc: boolean,
    active: boolean,
  ): Promise<Product[]> {
    return this.products
      .filter((p) => p.active === active)
      .sort((a, b) => this.compare(sort, asc, a, b));
  }

  async search(
    filter: ProductFilter,
    sort: ProductSort,
    asc: boolean,
  ): Promise<Product[]> {
    return this.products
      .filter((p) => Object.keys(filter).every((key) => filter[key] === p[key]))
      .sort((a, b) => this.compare(sort, asc, a, b));
  }
}
