import { Controller, Get, Post, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, OrderFilter, OrderSort, Status } from './order.model';

@Controller('orders')
export class OrderController {
  constructor(private order: OrderService) {}

  @Post()
  async create(order: Order): Promise<Order> {
    return await this.order.create(order);
  }

  @Get(':id')
  async get(id: string): Promise<Order> {
    return await this.order.get(id);
  }

  @Post(':id')
  async update(id: string, order: Order): Promise<Order> {
    return await this.order.update(id, order);
  }

  @Delete(':id')
  async delete(id: string): Promise<void> {
    return await this.order.delete(id);
  }

  @Get()
  async list(
    sort: OrderSort = 'fulfillment',
    asc: boolean = true,
    status: Status = Status.OPEN,
  ): Promise<Order[]> {
    return await this.order.list(sort, asc, status);
  }

  @Get('search')
  async search(
    filter: OrderFilter,
    sort: OrderSort = 'fulfillment',
    asc: boolean = true,
  ): Promise<Order[]> {
    return await this.order.search(filter, sort, asc);
  }
}
