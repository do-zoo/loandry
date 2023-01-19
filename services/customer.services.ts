import { KeyOfResponseStatus } from '@/variables/response-status';
import service from './_base.services';

export type CustomerResponse = {
  data: {
    _id: string;
    rfid: string;
    name: string;
    sex: string;
    place_of_birth: string;
    birth_date: Date;
    email: string;
    phone: string;
    rfid_used: number;
  };
  message: string;
  status: KeyOfResponseStatus;
};

type POSTCreateCustomerData = {
  rfid: string;
  name: string;
  sex: string;
  place_of_birth: string;
  birth_date: Date;
  email: string;
  phone: string;
};

export const CustomerService = {
  async availableToRegister(): Promise<CustomerResponse> {
    const { data } = await service.get('/customer/register');
    return data;
  },
  async getCustomerByRfId(): Promise<CustomerResponse> {
    const { data } = await service.get(`/customer/rfid`);
    return data;
  },
  async createCustomer(
    payload: POSTCreateCustomerData
  ): Promise<CustomerResponse> {
    const { data } = await service.post('/customer/register', payload);
    return data;
  },
  async getAllCustomer(): Promise<CustomerResponse> {
    const { data } = await service.get('/customer');
    return data;
  },
};
