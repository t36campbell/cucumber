export enum Fulfillment {
  UNFULFILLED,
  SCHEDULED,
  FULFILLED,
}

export enum Status {
  OPEN,
  CANCELED,
  CLOSED,
}

export enum Payment {
  PENDING,
  DECLINED,
  PAID,
}

export interface Item {
  id: string;
  quantity: number;
  shipped?: boolean;
  tracking?: string;
}

export interface Order {
  id?: string;
  items: Item[];
  total: number;
  status?: Status;
  customer: string; // assumption foreign key for customer's info (name, address, billing, etc)
  payment?: Payment;
  fulfillment?: Fulfillment;
}

export interface OrderFilter {
  id?: string;
  status?: Status;
  customer: string;
  payment?: Payment;
  fulfillment?: Fulfillment;
}

export type OrderSort = 'id' | 'total' | 'status' | 'payment' | 'fulfillment';
