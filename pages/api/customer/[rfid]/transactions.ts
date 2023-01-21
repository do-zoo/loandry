// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { CustomerModel, TransactionModel } from '@/models/index';
import { ProductModel } from '@/models/product/product.model';
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
      const { rfid, status } = req.query;

      try {
        dbConnect(); // connect to database
        const Customer = await CustomerModel.findOne({
          rfid,
        });

        const Transactions = await TransactionModel.find(
          status
            ? { customer_id: Customer._id, status }
            : { customer_id: Customer._id }
        );
        // const Transactions = await TransactionModel.find();

        const Product = await ProductModel.find();

        return res.send({
          message: 'Berhasil',
          status: 'success',
          data: {
            customer: Customer,
            transactions: Transactions,
            products: Product,
          },
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
