import { ITransaction } from "@/types/res";
import { faker } from "@faker-js/faker/locale/id_ID";

// type SubscriptionTier = "free" | "basic" | "business";

function createRandomTransaction(): ITransaction {
  const sex = faker.name.sexType();

  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();

  const invoice = faker.helpers.regexpStyleStringParse(
    "#[0-9][0-9][0-9][0-9][0-9][0-9]"
  );
  const quantity = faker.datatype.number({ min: 1, max: 20 });

  const status = faker.helpers.arrayElement([
    "waiting",
    "success",
    "pending",
    "canceled",
  ]);

  const code = faker.helpers.replaceSymbols("********");
  const product = faker.helpers.arrayElement([
    {
      code: code,
      name: "Baju Harian",
      price: 5000,
      unit: "kg",
    },
    {
      code: code,
      name: "Kemeja",
      price: 6000,
      unit: "pcs",
    },
    {
      code: code,
      name: "Jaket",
      price: 10000,
      unit: "pcs",
    },
    {
      code: code,
      name: "Jas",
      price: 15000,
      unit: "pcs",
    },
    {
      code: code,
      name: "Pakaian Dalam",
      price: 20000,
      unit: "lusin",
    },
    {
      code: code,
      name: "Sepatu",
      price: 15000,
      unit: "pcs",
    },
  ]);

  const { name: productName, price } = product;

  const createdAt = faker.date.between(
    "2020-01-01T00:00:00.000Z",
    "2030-01-01T00:00:00.000Z"
  );

  const range = faker.helpers.arrayElement([1, 2, 3, 4, 0]);

  const dueDate = faker.date.future(3, createdAt);
  const updatedAt = faker.date.future(range, createdAt);

  return {
    _id: faker.datatype.uuid(),
    invoice,
    status,
    customer_name: firstName + " " + lastName,
    customer_id: faker.datatype.uuid(),
    quantity,
    product_id: faker.datatype.uuid(),
    product_name: productName,
    product_price: price,
    total_amount: quantity * price,
    due_date: dueDate,
    createdAt,
    updatedAt,
  };
}

export const transaction = createRandomTransaction();

export const createTransactions = (transaction = 5) => {
  return Array.from({ length: transaction }, createRandomTransaction);
};
