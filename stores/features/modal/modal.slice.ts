import { RootState } from '@/stores/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalPrepare, ModalsState } from './modal.slice.d';

// Define the initial state using that type

const initialState: ModalsState = {
  modalPrepare: {
    visibility: false,
    // data:
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
  },
});

export const { setModalPrepare } = modalsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modals;

export default modalsSlice.reducer;
