// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { CustomerModel, RFIDModel } from '@/models/index';
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
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const { code, name, price, unit, image } = req.body;
      const filter = { _id: id };
      const update = { code, name, price, unit, image };

      try {
        dbConnect(); // connect to database
        await ProductModel.findOneAndUpdate(filter, update);
        const data = await ProductModel.findOne(filter);

        return res.status(200).json({
          message: 'update product successfully',
          data,
        });
      } catch (err) {
        return res.status(400).send({ err });
      }
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const filter = { _id: id };
      try {
        dbConnect(); // connect to database
        await ProductModel.findOneAndDelete(filter);

        return res.send({
          message: 'delete product successfully',
          status: 1,
        });
      } catch (err) {
        return res
          .status(400)
          .send({ message: 'Gagal', status: 3, data: null });
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const filter = { _id: id };
      try {
        dbConnect(); // connect to database
        const product = await ProductModel.findOne(filter);

        return res.send({
          message: 'Berhasil',
          status: 1,
          data: product,
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
