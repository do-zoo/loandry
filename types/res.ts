export interface ICustomer {
  _id: string;
  rfid: string;
  nisn: string;
  name: string;
  sex: string;
  place_of_birth: string;
  birth_date: Date;
  email: string;
  phone: string;
  rfid_used: number;
  createdAt: Date;
  updatedAt: Date;
}
export type CustomerKeys = keyof ICustomer;

export interface ITransaction {
  _id: string;
  invoice: string;
  status: string; //need to update
  customer_id: string;
  customer_name: string;
  quantity: number;
  product_id: string;
  product_name: string;
  product_price: number;
  total_amount: number;
  due_date: Date;
  createdAt: Date;
  updatedAt: Date;
}
export type TransactionKeys = keyof ITransaction;
