import { CreateProductData } from '@/services/product.services';

export interface modalScannerMessage {
  type: 'idle' | 'loading' | 'success' | 'error' | 'available';
  message: {
    title: string;
    text: string;
  };
}

export interface BaseModal<T> {
  visibility: boolean;
  data?: T;
}

export type ModalPrepare = BaseModal<{
  type: 'create-customer';
  message: modalScannerMessage[];
}>;

interface DataCreateProduct {
  type: 'create-product';
  defaultValues: CreateProductData;
}

interface DataUpdateProduct {
  type: 'update-product';
  defaultValues: UpdateProductData;
}

export type ModalProduct = BaseModal<DataCreateProduct | DataUpdateProduct>;

export interface ModalsState {
  modalPrepare: ModalPrepare;
  modalProduct: ModalProduct;
}
