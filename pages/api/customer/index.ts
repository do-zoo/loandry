// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { CustomerModel, RFIDModel } from '@/models/index';
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
      try {
        dbConnect(); // connect to database

        const Customers = await CustomerModel.find().sort({
          createdAt: -1,
        });

        return res.send({
          message: 'Berhasil',
          status: 1,
          data: Customers,
        });
      } catch (err) {
        return res
          .status(400)
          .send({ message: 'Gagal', status: 3, data: null });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
