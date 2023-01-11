import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Silakan isi ${path}",
    notType: "Isian ${path} hanya boleh diisi angka",
  },
  number: {
    positive: "Isian ${path} hanya boleh diisi angka positif",
  },
  string: {
    email: "Isian ${path} harus valid",
    length: "Panjang ${path} harus ${length} karakter",
    url: "Isian ${path} harus valid",
  },
});
