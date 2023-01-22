import { dbConnect } from '@/middlewares/mongodb';
import { WeightModel } from '@/models/index';
import { ResponseFuncs } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next';

// ----------------------------------------------------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { weight } = req.query;
      console.log(weight);
      if (!weight) {
        return res.status(400).send({ message: 'Gagal' });
      }

      try {
        dbConnect(); // connect to database
        const availableWeight = await WeightModel.findById(
          '63c905dd1af843e36ad1ab14'
        );

        availableWeight.weight = Number(weight);

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
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
