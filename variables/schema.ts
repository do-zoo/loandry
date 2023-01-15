import * as yup from 'yup';
import './_yup.locale';

const indonesianPhone = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g;

/**
 * Normalisasi nomor HP lokal
 * @param {string} phone
 * @return {string}
 */
function normalizePhoneNumber(phone: string): string {
  phone = String(phone).trim();
  if (phone.startsWith('+62')) {
    phone = '0' + phone.slice(3);
  } else if (phone.startsWith('62')) {
    phone = '0' + phone.slice(2);
  }
  return phone.replace(/[- .]/g, '');
}

/**
 * length of phone number
 * @param {string} phone
 * @return {boolean}
 */
function phoneLength(phone: string): boolean {
  if (!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)) {
    return false;
  }
  return true;
}

/**
 * Deteksi operator seluler indonesia
 * @param {string} phone
 * @return {string?}
 */
function prefixOperator(phone: string): string | null {
  const prefix = phone.slice(0, 4);
  if (['0831', '0832', '0833', '0838'].includes(prefix)) return 'axis';
  if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) return 'three';
  if (['0817', '0818', '0819', '0859', '0878', '0877'].includes(prefix))
    return 'xl';
  if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix))
    return 'indosat';
  if (
    [
      '0812',
      '0813',
      '0852',
      '0853',
      '0821',
      '0823',
      '0822',
      '0851',
      '0811',
    ].includes(prefix)
  )
    return 'telkomsel';
  if (
    [
      '0881',
      '0882',
      '0883',
      '0884',
      '0885',
      '0886',
      '0887',
      '0888',
      '0889',
    ].includes(prefix)
  )
    return 'smartfren';
  return null;
}

/**
 * is valid phone number?
 * @param {string} phone
 * @return {boolean}
 */
function validatePhoneNumber(phone: string): boolean {
  phone = normalizePhoneNumber(phone);
  return phoneLength(phone) && !!prefixOperator(phone);
}

const minBirthDate = new Date();
minBirthDate.setFullYear(minBirthDate.getFullYear() - 65);
const maxBirthDate = new Date();
maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);

// console.log(minBirthDate,)

export const UserLoginSchema = yup
  .object()
  .shape({
    email: yup.string().required().email().ensure().label('email'),
    password: yup
      .string()
      .required()
      .ensure()
      .min(6)
      .max(255)
      .label('kata sandi'),
  })
  .required();

export const CreateCustomerSchema = yup
  .object()
  .shape({
    name: yup.string().required().ensure().label('nama'),
    email: yup.string().required().email().ensure().label('email'),
    rfid: yup.string().required().ensure().label('rfid'),
    sex: yup.string().required().ensure().label('Jenis Kelamin'),
    place_of_birth: yup.string().required().ensure().label('Tempat Lahir'),
    birth_date: yup
      .date()
      .required()
      .min(minBirthDate, 'minimal harus -+ dari 65thn yang lalu')
      .max(maxBirthDate, 'max harus -+ dari 18thn yang lalu')
      .label('Tanggal Lahir'),
    phone: yup
      .string()
      .test('valid-number', 'Nomor telepon tidak valid', value =>
        validatePhoneNumber(value ?? '')
      )
      .required()
      .label('Nomor Telpon'),
  })
  .required();
