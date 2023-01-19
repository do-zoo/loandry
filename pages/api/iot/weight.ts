// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { WeightModel } from '@/models/index';
import { ResponseFuncs } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

// ----------------------------------------------------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { weight } = req.body;
      if (!weight) {
        return res.status(400).send({ message: 'Gagal' });
      }

      try {
        dbConnect(); // connect to database
        const availableWeight = await WeightModel.findById(
          '63c905dd1af843e36ad1ab14'
        );

        availableWeight.weight = weight;

        availableWeight.save((err: any, data: any) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          }
          return res.status(200).json({
            message: 'data updated successfully',
            data,
          });
        });
      } catch (err) {
        return res.status(400).send({ err });
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        dbConnect(); // connect to database
        const data = await WeightModel.findById('63c905dd1af843e36ad1ab14');
        return res.status(200).json({
          message: 'getting data successfully',
          data,
        });
      } catch (err) {
        return res.status(400).send({ err });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
