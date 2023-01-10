import { CustomerKeys, TransactionKeys } from "@/types/res";

export const customerKeys = [
  "_id",
  "rfid",
  "nisn",
  "name",
  "sex",
  "place_of_birth",
  "birth_date",
  "email",
  "phone",
  "rfid_used",
] satisfies CustomerKeys[];

export const transactionKeys = [
  "_id",
  "invoice",
  "createdAt",
  "status",
  "customer_id",
  "customer_name",
  "quantity",
  "product_id",
  "product_name",
  "product_price",
  "total_amount",
  "due_date",
] satisfies TransactionKeys[];
