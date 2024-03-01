import { store } from "src/app/store/store";
import {ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>;
export type AppDispatch = typeof store.dispatch;

export type TStateError = string | null