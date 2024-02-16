export interface Product {
  id?: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  active?: boolean;
}

export interface ProductFilter {
  id?: string;
  name?: string;
  type?: string;
  active?: boolean;
}

export type ProductSort = 'id' | 'name' | 'type' | 'price';
