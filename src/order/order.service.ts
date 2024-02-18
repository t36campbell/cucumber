import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import {
  Fulfillment,
  Order,
  OrderFilter,
  OrderSort,
  Payment,
  Status,
} from './order.model';

@Injectable()
export class OrderService {
  orders: Order[] = [];

  async create(order: Order): Promise<Order> {
    const id = uuid();
    order.status = Status.OPEN;
    order.payment = Payment.PENDING;
    order.fulfillment = Fulfillment.UNFULFILLED;
    const index = this.orders.length; // was length, but becomes last index after push
    this.orders.push({ id, ...order });
    return this.orders.at(index);
  }

  async get(id: string): Promise<Order> {
    return this.orders.find((p) => p.id === id);
  }

  async update(id: string, order: Order): Promise<Order> {
    const replace = 1;
    const index = this.orders.findIndex((p) => p.id === id);
    this.orders.splice(index, replace, { id, ...order });
    return this.orders.at(index);
  }

  async delete(id: string): Promise<void> {
    this.orders = this.orders.filter((p) => p.id !== id);
  }

  private compare(key: OrderSort, asc: boolean, a: Order, b: Order): number {
    if (key === 'total') {
      return asc ? a.total - b.total : b.total - a.total;
    }

    if (key === 'id') {
      return asc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    }

    const getValues = (): (Status | Payment | Fulfillment)[] => {
      switch (key) {
        case 'status':
          return Object.values(Status) as Status[];
        case 'payment':
          return Object.values(Payment) as Payment[];
        case 'fulfillment':
          return Object.values(Fulfillment) as Fulfillment[];
      }
    };

    const values = getValues();
    const array = asc ? values : values.reverse();
    const valueA: Status | Payment | Fulfillment = a[key];
    const valueB: Status | Payment | Fulfillment = b[key];

    return array.indexOf(valueA) - array.indexOf(valueB);
  }

  async list(sort: OrderSort, asc: boolean, status: Status): Promise<Order[]> {
    return this.orders
      .filter((p) => p.status === status)
      .sort((a, b) => this.compare(sort, asc, a, b));
  }

  async search(
    filter: OrderFilter,
    sort: OrderSort,
    asc: boolean,
  ): Promise<Order[]> {
    return this.orders
      .filter((p) => Object.keys(filter).every((key) => filter[key] === p[key]))
      .sort((a, b) => this.compare(sort, asc, a, b));
  }
}
