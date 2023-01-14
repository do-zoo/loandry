export interface modalScannerMessage {
  type: 'idle' | 'loading' | 'success';
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

export interface ModalsState {
  modalPrepare: ModalPrepare;
}
