import { faker } from "@faker-js/faker/locale/id_ID";

export const fakerCreatedAt = faker.date.between(
  "2020-01-01T00:00:00.000Z",
  "2030-01-01T00:00:00.000Z"
);

const range = faker.helpers.arrayElement([1, 2, 3, 4, 0, -1, -2, -3, -4]);

export const fakerDueDate = faker.date.future(3, fakerCreatedAt);
export const fakerUpdatedAt = faker.date.future(range, fakerCreatedAt);

export const FakerSex = faker.name.sexType();

export const fakerFirstName = faker.name.firstName(FakerSex);
export const FakerLastName = faker.name.lastName();

export const fakerStatus = faker.helpers.arrayElement([
  "waiting",
  "success",
  "pending",
  "canceled",
]);

export const code = faker.helpers.replaceSymbols("********");

export const fakerProduct = faker.helpers.arrayElement([
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
