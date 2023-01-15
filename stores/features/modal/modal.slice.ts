import { RootState } from '@/stores/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalPrepare, ModalProduct, ModalsState } from './modal.slice.d';

// Define the initial state using that type

const initialState: ModalsState = {
  modalPrepare: {
    visibility: false,
    // data:
  },
  modalProduct: {
    visibility: false,
  },
};

export const modalsSlice = createSlice({
  name: 'modals',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setModalPrepare: (state, action: PayloadAction<ModalPrepare>) => {
      state.modalPrepare.visibility = action.payload.visibility;
      state.modalPrepare.data = action.payload.data;
    },
    setModalProduct: (state, action: PayloadAction<ModalProduct>) => {
      state.modalProduct.visibility = action.payload.visibility;
      state.modalProduct.data = action.payload.data;
    },
  },
});

export const { setModalPrepare, setModalProduct } = modalsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modals;

export default modalsSlice.reducer;
