import { CustomerKeys, TStatus, TransactionKeys } from '@/types/res';

export const customerKeys = [
  '_id',
  'rfid',
  'name',
  'sex',
  'place_of_birth',
  'birth_date',
  'email',
  'phone',
  'rfid_used',
] satisfies CustomerKeys[];

export const transactionKeys = [
  '_id',
  'invoice',
  'createdAt',
  'status',
  'customer_id',
  'customer_name',
  'quantity',
  'product_id',
  'product_name',
  'product_price',
  'total_amount',
  'due_date',
] satisfies TransactionKeys[];

export const transactionStatus = [
  'success',
  'canceled',
  'progress',
] satisfies TStatus[];

export const APP_NAME = 'Loandry';
