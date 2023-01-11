import * as yup from "yup";
import "./_yup.locale";

export const UserLoginSchema = yup
  .object()
  .shape({
    email: yup.string().required().email().ensure().label("email"),
    password: yup
      .string()
      .required()
      .ensure()
      .min(6)
      .max(255)
      .label("kata sandi"),
  })
  .required();
