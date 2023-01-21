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
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { invoice, customer_id, quantity, product_id, due_date } = req.body;

      try {
        dbConnect(); // connect to database
        const customer = await CustomerModel.findById(customer_id);
        const product = await ProductModel.findById(product_id);

        const payload = {
          invoice,
          customer_id,
          customer_name: customer.name,
          quantity,
          product_id,
          product_name: product.name,
          product_price: product.price,
          total_amount: quantity * product.price,
          due_date,
          status: 'progress',
        };

        const transaction = await TransactionModel.create(payload);

        return res.status(200).json({
          message: 'create product successfully',
          data: transaction,
          status: 'success',
        });
      } catch (err) {
        return res.status(400).send({ err });
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        dbConnect(); // connect to database
        const transactions = await TransactionModel.find();

        return res.send({
          message: 'Berhasil',
          status: 1,
          data: transactions,
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
