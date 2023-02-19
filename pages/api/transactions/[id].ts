// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { TransactionModel } from '@/models/index';
import { ResponseFuncs } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next';

// ----------------------------------------------------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    PATCH: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const { status } = req.body;
      const filter = { _id: id };
      const update = { status };
      try {
        dbConnect(); // connect to database

        TransactionModel.findOneAndUpdate(filter, update);

        const transaction = await TransactionModel.findOne(filter);

        return res.send({
          message: 'Berhasil',
          status: 'success',
          data: transaction,
        });
      } catch (err) {
        return res
          .status(400)
          .send({ message: 'Gagal', status: 'error', data: null });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
