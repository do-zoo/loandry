export interface ICustomer {
  _id: string;
  rfid: string;
  name: string;
  sex: string;
  place_of_birth: string;
  birth_date: string;
  email: string;
  phone: string;
  rfid_used: number;
  createdAt: string;
  updatedAt: string;
}
export type CustomerKeys = keyof ICustomer;

export interface ITransaction {
  _id: string;
  invoice: string;
  status: TStatus;
  customer_id: string;
  customer_name: string;
  quantity: number;
  product_id: string;
  product_name: string;
  product_price: number;
  total_amount: number;
  due_date: string;
  createdAt: string;
  updatedAt: string;
}
export type TransactionKeys = keyof ITransaction;

export type TStatus = 'success' | 'canceled' | 'progress';
