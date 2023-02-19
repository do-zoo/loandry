// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { CustomerModel, RFIDModel, TransactionModel } from '@/models/index';
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
    PATCH: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const { status } = req.body;
      const filter = { _id: id };
      const update = { status };
      try {
        dbConnect(); // connect to database

        await TransactionModel.findOneAndUpdate(filter, update);

        const transaction = await TransactionModel.findOne(filter);
        const customer = await CustomerModel.findById(transaction?.customer_id);

        const payloadMail = {
          service_id: 'service_bfsglpb',
          template_id: 'template_vtiep6j',
          user_id: 'L-G677Y0EVo1bSBSz',
          template_params: {
            email: customer.email,
            to_name: customer.name,
            rfid: customer.rfid,
            invoice: transaction.invoice,
            product_name: transaction.product_name,
            total_amount: transaction.total_amount,
          },
        };

        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadMail),
        });

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
