import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ProductService } from '@product/product.service';
import { Product, ProductFilter, ProductSort } from './product.model';

@Controller('products')
export class ProductController {
  constructor(private product: ProductService) {}

  @Post()
  async create(product: Product): Promise<Product> {
    return await this.product.create(product);
  }

  @Get(':id')
  async get(id: string): Promise<Product> {
    return await this.product.get(id);
  }

  @Post(':id')
  async update(id: string, product: Product): Promise<Product> {
    return await this.product.update(id, product);
  }

  @Delete(':id')
  async delete(id: string): Promise<void> {
    return await this.product.delete(id);
  }

  @Get()
  async list(
    sort: ProductSort = 'name',
    asc = true,
    active = true,
  ): Promise<Product[]> {
    return await this.product.list(sort, asc, active);
  }

  @Get('search')
  async search(
    filter: ProductFilter,
    sort: ProductSort = 'name',
    asc = true,
  ): Promise<Product[]> {
    return await this.product.search(filter, sort, asc);
  }
}
