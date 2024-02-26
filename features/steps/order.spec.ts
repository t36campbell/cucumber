import * as assert from 'assert';
import { DataTable } from '@cucumber/cucumber';
import { binding, when, then, given } from 'cucumber-tsflow';

import { OrderService } from '../../src/order/order.service';
import { OrderController } from '../../src/order/order.controller';
import {
  Fulfillment,
  Item,
  Order,
  Payment,
  Status,
} from '../../src/order/order.model';

@binding()
class Create {
  data: Order = { items: [], total: 0, customer: '' };
  order: Order;
  service: OrderService;
  controller: OrderController;

  @given('the orders service is instantiated')
  public async initService(): Promise<void> {
    this.service = new OrderService();
  }

  @given('the orders controller is instantiated')
  public async initController(): Promise<void> {
    this.controller = new OrderController(this.service);
  }

  private covertToItems = (table: DataTable): Item[] => {
    return table
      .hashes()
      .map(({ id, quantity }) => ({ id, quantity }) as unknown as Item);
  };

  @given('an order with the following items:')
  public async items(table: DataTable): Promise<void> {
    this.data.items = this.covertToItems(table);
  }

  @given('a total of {float}')
  public async total(total: number): Promise<void> {
    this.data.total = total;
  }

  @given('a customer of {string}')
  public async customer(id: string): Promise<void> {
    this.data.customer = id;
  }

  @when('the order is created')
  public async create(): Promise<void> {
    this.order = await this.service.create(this.data);
  }

  private covertToOrder = (table: DataTable): Order[] => {
    return table.hashes().map(
      ({ id, items, total, status, customer, payment, fulfillment }) =>
        ({
          id,
          items,
          total,
          status,
          customer,
          payment,
          fulfillment,
        }) as unknown as Order,
    );
  };

  private testOrder = async (
    order: Order,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    index: number = 0,
  ): Promise<void> => {
    // how to test the generated values like id
    const status = Status[this.order.status];
    const payment = Payment[this.order.payment];
    const fulfillment = Fulfillment[this.order.fulfillment];
    assert.equal(this.order.total, order.total);
    assert.equal(this.order.total, this.data.total);
    assert.equal(this.order.items, this.data.items);
    assert.equal(this.order.customer, order.customer);
    assert.equal(this.order.customer, this.data.customer);

    assert.equal(status, order.status);
    assert.equal(payment, order.payment);
    assert.equal(status, Status[index]);
    assert.equal(payment, Payment[index]);
    assert.equal(fulfillment, order.fulfillment);
    assert.equal(fulfillment, Fulfillment[index]);
  };

  @then('the new order will be:')
  public async created(table: DataTable): Promise<void> {
    const orders = this.covertToOrder(table);
    const order = orders.pop();

    await this.testOrder(order);
  }

  @given('the following order info:')
  public async setOrder(table: DataTable): Promise<void> {
    const items = this.data.items;
    const orders = this.covertToOrder(table);
    const { id, total, status, customer, payment, fulfillment } = orders.pop();
    this.data = {
      id,
      total,
      items,
      customer,
      status: Status[status] as unknown as Status,
      payment: Payment[payment] as unknown as Payment,
      fulfillment: Fulfillment[fulfillment] as unknown as Fulfillment,
    };
    this.service.orders.push(this.data);
  }

  @when('I request an order with id {string}')
  public async get(id: string): Promise<void> {
    this.order = await this.service.get(id);
  }

  @then('I will receive an order with the following info:')
  public async received(table: DataTable): Promise<void> {
    const orders = this.covertToOrder(table);
    const order = orders.pop();

    await this.testOrder(order);
  }

  @then('the order will have the following items:')
  public async receivedItems(table: DataTable): Promise<void> {
    const items = this.covertToItems(table);
    items.forEach((item, index) => {
      const data = this.data.items.at(index);
      assert.equal(data.id, item.id);
      assert.equal(data.quantity, item.quantity);
    });
  }

  @when(
    'I update payment to {string}, fulfillment to {string}, and status to {string} for order id {string}',
  )
  public async update(
    payment: string,
    fulfillment: string,
    status: string,
    id: string,
  ): Promise<void> {
    const order: Order = {
      id,
      items: this.data.items,
      total: this.data.total,
      status: Status[status],
      payment: Payment[payment],
      customer: this.data.customer,
      fulfillment: Fulfillment[fulfillment],
    };
    this.order = await this.service.update(id, order);
  }

  @then('the updated order will have the following info:')
  public async updated(table: DataTable): Promise<void> {
    const orders = this.covertToOrder(table);
    const order = orders.pop();

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    await this.testOrder(order, 2);
  }

  @given('an order with following info:')
  public async set(table: DataTable): Promise<void> {
    const items = this.data.items;
    const orders = this.covertToOrder(table);
    const { id, total, status, customer, payment, fulfillment } = orders.pop();
    this.data = {
      id,
      total,
      items,
      customer,
      status: Status[status] as unknown as Status,
      payment: Payment[payment] as unknown as Payment,
      fulfillment: Fulfillment[fulfillment] as unknown as Fulfillment,
    };
    this.service.orders.push(this.data);
  }

  @when('I request to delete an order with id {string}')
  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }

  @then('that order {string} will not exist anymore')
  public async deleted(id: string): Promise<void> {
    this.order = await this.service.get(id);
    assert.equal(this.order, undefined);
  }
}
export default Create;
