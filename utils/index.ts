import { CustomerKeys, ICustomer, TransactionKeys } from "@/types/res";

export const isDev = process.env.NODE_ENV === "development";

export interface ICustomerLabel {
  key: CustomerKeys;
  value: string;
}
export function generateCustomerLabel(
  key: CustomerKeys
): ICustomerLabel | null {
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

export interface ITransactionLabel {
  key: TransactionKeys;
  value: string;
}

export function generateTransactionLabel(
  key: TransactionKeys
): ITransactionLabel | null {
  switch (key) {
    case "customer_name":
      return {
        key,
        value: "Nama Pelanggan",
      };
    case "due_date":
      return {
        key,
        value: "Tanggal Pengambilan",
      };

    case "invoice":
      return {
        key,
        value: "Invoice",
      };

    case "createdAt":
      return {
        key,
        value: "Tanggal Transaksi",
      };

    case "product_name":
      return {
        key,
        value: "Nama Produk",
      };
    case "product_price":
      return {
        key,
        value: "Harga",
      };
    case "quantity":
      return {
        key,
        value: "Kuantitas",
      };
    case "status":
      return {
        key,
        value: "Status",
      };
    case "total_amount":
      return {
        key,
        value: "Total",
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
