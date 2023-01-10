import { ICustomer } from "@/types/res";
import { faker } from "@faker-js/faker/locale/id_ID";

// type SubscriptionTier = "free" | "basic" | "business";

function createRandomCustomer(): ICustomer {
  const sex = faker.name.sexType();

  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();

  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);
  const range = faker.helpers.arrayElement([1, 2, 3, 4, 0]);

  const nisn = faker.helpers.replaceSymbols("##########");
  const createdAt = faker.date.between(
    "2020-01-01T00:00:00.000Z",
    "2030-01-01T00:00:00.000Z"
  );

  const updatedAt = faker.date.future(range, createdAt);

  return {
    _id: faker.datatype.uuid(),
    rfid: faker.helpers.replaceSymbols("******"),
    nisn,
    name: firstName + " " + lastName,
    sex,
    place_of_birth: faker.address.cityName(),
    birth_date: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
    email,
    phone: faker.phone.number("+628##########"),
    rfid_used: faker.datatype.number({ min: 0, max: 1 }),
    createdAt,
    updatedAt,
  };
}

export const customer = createRandomCustomer();

export const createCustomers = (customer = 5) => {
  return Array.from({ length: customer }, createRandomCustomer);
};
