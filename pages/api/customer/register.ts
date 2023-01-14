// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { CustomerModel, RFIDModel } from '@/models/index';
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
      const { rfid } = req.body;
      if (!rfid) {
        return res.status(400).send({ message: 'Gagal' });
      }
      try {
        dbConnect(); // connect to database
        const availableRFID = await RFIDModel.findById(
          '63bad69c0832798a96e47f3c'
        );

        availableRFID.rfid = rfid;
        // const updatable = availableRFID[0]

        // const update = await RFIDModel.updateOne({
        //     _id: updatable
        // },{
        //   rfid,
        // });
        availableRFID.save((err: any, data: any) => {
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
        const availableRFID = await RFIDModel.findById(
          '63bad69c0832798a96e47f3c'
        );

        const availableCustomer = await CustomerModel.findOne({
          rfid: availableRFID.rfid,
        });

        if (availableCustomer) {
          return res.send({
            message: 'Kartu Sudah Digunakan',
            status: 2,
            data: availableCustomer,
          });
        }

        if (availableRFID.rfid === '0') {
          return res.send({
            message: 'RFID Tidak Ditemukan',
            status: 3,
            data: null,
          });
        }

        return res.send({
          message: 'Berhasil',
          status: 1,
          data: availableRFID,
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
