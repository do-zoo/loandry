import { responseStatus } from '@/variables/response-status';
import service from './_base.services';

export type GetWeightNowResponse = {
  data?: { _id: string; weight: number; updatedAt: string };
  message: string;
  status: keyof typeof responseStatus;
};

export const WeightService = {
  async getWeight(): Promise<GetWeightNowResponse> {
    const { data } = await service.get('/iot/weight');
    return data;
  },
};
