import { createSlice } from "@reduxjs/toolkit";
import { TStoreAction } from "src/shared/types/storeTypes";

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
        setModal: (state, action: TStoreAction<boolean>) => {
            state.isOpened = action.payload;
        },
    },
    
})

export const { setModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;