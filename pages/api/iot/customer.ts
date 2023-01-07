// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseFuncs } from "../../../utils/types";
import { dbConnect } from "../../../middlewares";
import { CustomerModel } from "../../../models/customer/customer.model";

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
      // if (!email || !password) {
      //   return res
      //     .status(400)
      //     .send({ message: "Wajib mengisi kolom Email dan password" });
      // }
      // try {
      //   dbConnect(); // connect to database
      //   const users = UserModel;
      //   const user = await users.findOne({ email });
      //   if (!user) {
      //     return res
      //       .status(400)
      //       .send({ message: "Cek kembali email dan password" });
      //   }
      //   if (!matchPass(password, user.password)) {
      //     return res
      //       .status(400)
      //       .send({ message: "Cek kembali email dan password" });
      //   }
      //   return res.send({ message: "Login Sukses", data: user });
      // } catch (err) {
      //   return res.status(400).send({ err });
      // }
      return res.status(400).send({ message: "berhasil" });
      //   const allUsers = await users.find();
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });

  //   try {
  //     dbConnect();

  //     const users = UserModel;

  //     res.status(200).json({ users: allUsers });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
}
