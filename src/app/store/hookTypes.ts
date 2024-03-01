import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authApi } from "src/features/auth-form";
import { AppDispatch, RootState, AppThunkDispatch } from "src/app/store/storeTypes";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppThunkDispatch = useDispatch;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState,
    dispatch: AppDispatch,
    extra: {
        authApi: typeof authApi,
    },
    rejectValue: string
}>()