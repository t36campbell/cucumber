import { Controller, Get, Post, Delete } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private order: OrderService) {}

  @Post()
  async create() {
    return await this.order.create();
  }

  @Get(':id')
  async get() {
    return await this.order.get();
  }

  @Post(':id')
  async update() {
    return await this.order.update();
  }

  @Get()
  async list() {
    return await this.order.list();
  }

  @Delete(':id')
  async delete() {
    return await this.order.delete();
  }

  @Get('search')
  async search() {
    return await this.order.search();
  }
}
