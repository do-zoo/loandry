// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from '@/middlewares/mongodb';
import { RFIDModel } from '@/models/index';
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
        const availableRFID = await RFIDModel.findById(
          '63bad69c0832798a96e47f3c'
        );

        availableRFID.rfid = 0;

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
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
