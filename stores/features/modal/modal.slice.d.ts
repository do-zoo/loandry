import { CreateProductData } from '@/services/product.services';

export interface BaseModal<T> {
  visibility: boolean;
  data?: T;
}

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
  modalProduct: ModalProduct;
}
