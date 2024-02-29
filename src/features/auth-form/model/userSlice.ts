import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { getActionName, payloadCreatorError } from 'src/app/store/helpers';
import { createAppAsyncThunk } from 'src/app/store/hookTypes';
import { TUserResponse, TLoginFormData } from 'src/shared/types/authTypes';
import { TStateError, TStoreAction } from 'src/shared/types/storeTypes';
import { setUserBalance } from 'src/widgets/game/model/gameSlice';

export type TUserState = {
    isAuthChecked: boolean,
    data: TUserResponse| null,

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

export const sliceName = 'user'

export const fetchLoginUser = createAppAsyncThunk<TUserResponse, TLoginFormData>(
    `${sliceName}/fetchLoginUser`,
    async (dataUser, { fulfillWithValue, rejectWithValue, extra: { authApi }, dispatch }) => {
        try {
            const data = (await authApi.login(dataUser)).data
            if (data.balance) {
                dispatch(setUserBalance(data.balance))
                return fulfillWithValue(data)
            } else {
                return rejectWithValue(data)
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
            dispatch(setUserBalance(data.balance))
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
        changeUserBalance: (state, action: TStoreAction<number>) => {
            if (state.data) {
                state.data.balance = action.payload
            }
        }
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
                (state, action) => {
                    return {
                        ...state,
                        [`${getActionName(action.type)}Request`]: false,
                        [`${getActionName(action.type)}Error`]: action.payload
                    }
                })
            .addMatcher(
                isFulfilled(fetchAuthCheck, fetchLoginUser),
                (state, action) => {
                    return {
                        ...state,
                        data: action.payload,
                        [`${getActionName(action.type)}Request`]: false
                    }
                })
    }
})

export const { authCheck, changeUserBalance } = userSlice.actions;
export const userReducer = userSlice.reducer;