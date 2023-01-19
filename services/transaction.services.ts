import { KeyOfResponseStatus } from '@/variables/response-status';
import service from './_base.services';

export type TransactionResponse = {
  data: {
    _id: string;
    invoice: string;
    status: string;
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
    __v: number;
  };
  message: string;
  status: KeyOfResponseStatus;
};

type POSTCreateTransactionData = {
  invoice: string;
  customer_id: string;
  quantity: number;
  product_id: string;
  due_date: string;
};

export const TransactionsService = {
  async getTransactionByUserId(): Promise<TransactionResponse> {
    const { data } = await service.get(`/transactions/id`);
    return data;
  },
  async createTransaction(
    payload: POSTCreateTransactionData
  ): Promise<TransactionResponse> {
    const { data } = await service.post('/transactions', payload);
    return data;
  },
  async getAllTransaction(): Promise<TransactionResponse> {
    const { data } = await service.get('/transactions/');
    return data;
  },
};
