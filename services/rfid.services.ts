import { responseStatus } from '@/variables/response-status';
import service from './_base.services';

export type GetRFIDNowResponse = {
  data: { _id: string; rfid: string; __v: number; updatedAt: string };
  message: string;
  status: keyof typeof responseStatus;
};

export const RfIdService = {
  async resetAvailableRfId(): Promise<GetRFIDNowResponse> {
    const { data } = await service.delete('/iot/customer/reset');
    return data;
  },
  async getAvailableRfId(): Promise<GetRFIDNowResponse> {
    const { data } = await service.get('/iot/customer/now');
    return data;
  },
};
