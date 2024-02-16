export enum Fulfillment {
  PARTIAL,
  FULFILLED,
  SCHEDULED,
  UNFULFILLED,
}

export enum Status {
  OPEN,
  CANCELED,
}

export enum Payment {
  PAID,
  PENDING,
  DECLINED,
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
  status?: Status;
  payment?: Payment;
  customer: string; // assumption foreign key for customer's info (name, address, billing, etc)
  fulfillment?: Fulfillment;
}
