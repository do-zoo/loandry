import service from './_base.services';

export type GetRFIDNowResponse = {
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

export const RfIdService = {
  async resetAvailableRfId(): Promise<GetRFIDNowResponse> {
    const { data } = await service.get('/iot/customer/reset');
    return data;
  },
};
