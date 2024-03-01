export const payloadCreatorError = (error: any):string => (
    error.message ? error.message : (typeof error === "string" ? error : "Что-то пошло не так")
)
export function getActionName(actionType: string) {
    return actionType.split("/")[1]
}