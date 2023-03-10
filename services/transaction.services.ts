import { KeyOfResponseStatus } from '@/variables/response-status';
import service from './_base.services';

type TransactionStatus = 'progress' | 'success' | 'canceled';

export type TransactionResponse = {
  data: {
    _id: string;
    invoice: string;
    status: TransactionStatus;
    customer_id: string;
    customer_name: string;
    quantity: number;
    product_id: string;
    product_name: string;
    product_price: number;
    total_amount: number;
    due_date: Date;
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
  due_date: Date;
};

export const TransactionsService = {
  // async getTransactionByUserId(): Promise<TransactionResponse> {
  //   const { data } = await service.get(`/transactions/id`);
  //   return data;
  // },
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
  async getProgressTransaction(): Promise<TransactionResponse> {
    const { data } = await service.get('/transactions/');
    return data;
  },
  async updateStatusTransaction({
    id,
    status,
  }: Record<'id' | 'status', string>): Promise<TransactionResponse> {
    const { data } = await service.patch(`/transactions/${id}`, {
      status,
    });
    return data;
  },
};
