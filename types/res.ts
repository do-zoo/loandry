export interface ICustomer {
  _id: string;
  rfid: string;
  nisn: string;
  name: string;
  sex: string;
  place_of_birth: string;
  birth_date: Date;
  email: string;
  phone: string;
  rfid_used: number;
}
export type CustomerKes = keyof ICustomer;
