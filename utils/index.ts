import { CustomerKes, ICustomer } from "@/types/res";

export const isDev = process.env.NODE_ENV === "development";

export interface ICustomerLabel {
  key: CustomerKes;
  value: string;
}

export function generateCustomerLabel(key: CustomerKes): ICustomerLabel | null {
  switch (key) {
    case "birth_date":
      return {
        key,
        value: "Tanggal Lahir",
      };
    case "email":
      return {
        key,
        value: "Email",
      };
    case "name":
      return {
        key,
        value: "Nama",
      };

    case "nisn":
      return {
        key,
        value: "NISN",
      };
    case "rfid":
      return {
        key,
        value: "Kode",
      };
    case "phone":
      return {
        key,
        value: "Telepon",
      };
    case "place_of_birth":
      return {
        key,
        value: "Tempat Lahir",
      };
    case "sex":
      return {
        key,
        value: "Jenis Kelamin",
      };
    default:
      return null;
  }
}

export function localeSexToId(sex: string): "laki-laki" | "perempuan" | null {
  switch (sex) {
    case "female":
      return "perempuan";
    case "male":
      return "laki-laki";

    default:
      return null;
  }
}
