import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModalState {
    isOpened: boolean
}

const initialState: IModalState = {
    isOpened: false,
}

const sliceName = "modal";

export const modalSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<boolean>) => {
            state.isOpened = action.payload;
        },
    },
    
})
export const setModal = modalSlice.actions.setModal;
export const modalReducer = modalSlice.reducer;