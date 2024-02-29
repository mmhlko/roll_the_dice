import { AsyncThunk, UnknownAction } from "@reduxjs/toolkit"

export const payloadCreatorError = (error: any):string => (
    error.message ? error.message : (typeof error === "string" ? error : "Что-то пошло не так")
)
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

export function isPendingAction(action: UnknownAction): action is PendingAction {
    return typeof action.type === 'string' && action.type.endsWith('/pending')
}

export function isRejectedAction(action: UnknownAction): action is RejectedAction {
    return typeof action.type === 'string' && action.type.endsWith('/rejected')
}

//функция для возвращения названия экшена в виде строки user/fetchUserInfo/pending => fetchUserInfo
export function getActionName(actionType: string) { // [user, fetchUserInfo, pending]
    return actionType.split('/')[1]
}