import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { getActionName, payloadCreatorError } from "src/app/store/helpers";
import { createAppAsyncThunk } from "src/app/store/hookTypes";
import { TUserResponse, TLoginFormData } from "src/shared/types/authTypes";
import { TStateError } from "src/app/store/storeTypes";

export type TUserState = {
    isAuthChecked: boolean,
    data: TUserResponse | null,

    fetchLoginUserRequest: boolean,
    fetchLoginUserError: TStateError,

    fetchAuthCheckRequest: boolean,
    fetchAuthCheckError: TStateError,
}

const initialState: TUserState = {
    isAuthChecked: false,
    data: null,

    fetchLoginUserRequest: false,
    fetchLoginUserError: null,

    fetchAuthCheckRequest: false,
    fetchAuthCheckError: null,

}

export const sliceName = "user"

export const fetchLoginUser = createAppAsyncThunk<TUserResponse, TLoginFormData>(
    `${sliceName}/fetchLoginUser`,
    async (dataUser, { fulfillWithValue, rejectWithValue, extra: { authApi } }) => {
        try {
            const data = (await authApi.login(dataUser)).data
            if (data.id) {
                return fulfillWithValue(data)
            } else {
                return rejectWithValue("Login error")
            }
        } catch (error) {
            return rejectWithValue(payloadCreatorError(error))
        }
    }
)

export const fetchAuthCheck = createAppAsyncThunk<TUserResponse>(
    `${sliceName}/fetchAuthCheck`,
    async (_, { fulfillWithValue, rejectWithValue, extra: { authApi }, dispatch }) => {
        try {
            const data = (await authApi.checkMe()).data;
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(payloadCreatorError(error))
        }
        finally { dispatch(authCheck()) }
    }
)

const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isPending(fetchAuthCheck, fetchLoginUser),
                (state, action) => {
                    return {
                        ...state,
                        [`${getActionName(action.type)}Request`]: true,
                        [`${getActionName(action.type)}Error`]: null
                    }
                })
            .addMatcher(
                isRejected(fetchAuthCheck, fetchLoginUser),
                (state, action: PayloadAction<string | unknown>) => {
                    console.log("isRejected", action);
                    return {
                        ...state,
                        [`${getActionName(action.type)}Request`]: false,
                        [`${getActionName(action.type)}Error`]: action.payload
                    }
                })
            .addMatcher(
                isFulfilled(fetchAuthCheck, fetchLoginUser),
                (state, action: PayloadAction<TUserResponse>) => {
                    return {
                        ...state,
                        data: action.payload,
                        [`${getActionName(action.type)}Request`]: false
                    }
                })
    }
})

export const authCheck = userSlice.actions.authCheck;
export const userReducer = userSlice.reducer;