// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from "@/middlewares/mongodb";
import { CustomerModel } from "@/models/index";
import { ResponseFuncs } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

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
      const { rfid, rfid_used } = req.body;
      console.log(rfid, rfid_used);
      if (!rfid || (!rfid_used && rfid_used !== 0)) {
        return res.status(400).send({ message: "Gagal" });
      }
      try {
        dbConnect(); // connect to database
        const customers = await CustomerModel.create({
          rfid,
          rfid_used,
        });
        return res.status(201).json({
          message: "Client created successfully",
          data: customers,
        });
      } catch (err) {
        return res.status(400).send({ err });
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const {
        query: { id },
      } = req;

      try {
        dbConnect(); // connect to database

        const customers = await CustomerModel.findOne({
          rfid: id,
        });

        if (!customers) {
          return res.status(400).send({ message: "Gagal" });
        }

        return res.send({ message: "Berhasil", data: customers });
      } catch (err) {
        return res.status(400).send({ err });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}
