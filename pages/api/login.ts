import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../middlewares";
import { UserModel } from "../../models";
import { ResponseFuncs } from "../../utils/types";

// ----------------------------------------------------------------------
const matchPass = (password: string, confirmPassword: string): boolean =>
  password === confirmPassword;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "Wajib mengisi kolom Email dan password" });
      }

      try {
        dbConnect(); // connect to database
        const users = UserModel;
        const user = await users.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .send({ message: "Cek kembali email dan password" });
        }
        if (!matchPass(password, user.password)) {
          return res
            .status(400)
            .send({ message: "Cek kembali email dan password" });
        }

        return res.send({ message: "Login Sukses", data: user });
      } catch (err) {
        return res.status(400).send({ err });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}
