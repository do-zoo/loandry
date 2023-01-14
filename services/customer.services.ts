import service from './_base.services';

export type GetAvailableCustomerResponse = {
  data?: {
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
  status: number;
};

export const CustomerService = {
  async availableToRegister(): Promise<GetAvailableCustomerResponse> {
    const { data } = await service.get('/customer/register');
    return data;
  },
};
