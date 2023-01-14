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
      type: 'success',
      message: {
        title: 'Selamat Kartu Siap Digunakan!!!',
        text: 'Klik Tombol Lanjutkan Untuk mendaftarkan kartu',
      },
    },
  ],
} satisfies ModalPrepare['data'];
