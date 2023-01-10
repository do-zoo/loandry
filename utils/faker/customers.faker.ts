import { faker } from "@faker-js/faker/locale/id_ID";
import { SexType } from "@faker-js/faker";
import { ICustomer } from "@/types/res";

// type SubscriptionTier = "free" | "basic" | "business";

function createRandomCustomer(): ICustomer {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);
  const nisn = faker.helpers.replaceSymbols("##########");

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
  };
}

export const customer = createRandomCustomer();

export const createCustomers = (customer = 5) => {
  return Array.from({ length: customer }, createRandomCustomer);
};
