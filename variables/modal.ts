import type { ModalPrepare } from '@/stores/features/modal/modal.slice.d';

export const modalCreateCustomerMessage = {
  type: 'create-customer',
  message: [
    {
      type: 'idle',
      message: {
        title: 'Siapkan Kartu Anda',
        text: 'Pastikan kartu Anda Baru',
      },
    },
    {
      type: 'loading',
      message: {
        title: 'Memindai',
        text: 'Dekatkan kartu anda ke RFID Scanner',
      },
    },
    {
      type: 'error',
      message: {
        title: 'Ups Terjadi Kesalahan',
        text: 'Pastikan Anda mendekatkan kartu ke RFID Scanner dan Terhubung dengan Internet',
      },
    },
    {
      type: 'success',
      message: {
        title: 'Selamat Kartu Siap Digunakan!!!',
        text: 'Klik Tombol Lanjutkan Untuk mendaftarkan kartu',
      },
    },
    {
      type: 'available',
      message: {
        title: 'Kartu Anda Sudah Digunakan',
        text: 'Pastikan Kartu anda baru',
      },
    },
  ],
} satisfies ModalPrepare['data'];
