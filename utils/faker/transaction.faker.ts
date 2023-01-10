import { faker } from "@faker-js/faker/locale/id_ID";
import { ITransaction } from "@/types/res";
import {
  FakerLastName,
  fakerCreatedAt,
  fakerDueDate,
  fakerFirstName,
  fakerProduct,
  fakerStatus,
  fakerUpdatedAt,
} from "./_base.faker";

// type SubscriptionTier = "free" | "basic" | "business";

function createRandomTransaction(): ITransaction {
  const invoice = faker.helpers.regexpStyleStringParse(
    "#[0-9][0-9][0-9][0-9][0-9][0-9]"
  );
  const quantity = faker.datatype.number({ min: 1, max: 20 });
  const { name: productName, price } = fakerProduct;

  return {
    _id: faker.datatype.uuid(),
    invoice,
    status: fakerStatus,
    customer_name: fakerFirstName + " " + FakerLastName,
    customer_id: faker.datatype.uuid(),
    quantity,
    product_id: faker.datatype.uuid(),
    product_name: productName,
    product_price: price,
    total_amount: quantity * price,
    due_date: fakerDueDate,
    createdAt: fakerCreatedAt,
    updatedAt: fakerUpdatedAt,
  };
}

export const transaction = createRandomTransaction();

export const createTransactions = (transaction = 5) => {
  return Array.from({ length: transaction }, createRandomTransaction);
};
