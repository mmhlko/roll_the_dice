import { authApi } from "src/features/auth-form";
import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "src/widgets/game";
import { modalReducer } from "src/entries/modal/model/modalSlice";
import { userReducer } from "src/features/auth-form/model/userSlice";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        modal: modalReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    authApi,
                }
            },
        })
    }
})