const regExps = {
    login: /^[A-Za-z][A-Za-z0-9]{4,15}$/,
    password: /^[A-Za-z0-9_]{5,19}$/,
}
const validationErrorMessages = {
    required: "Обязательное поле",
    login: "Логин не соответствует правилам",
    password: "Пароль не соответсвует правилам"
}

export const validationRegister = {
    login: {
        required: {
            value: true,
            message: validationErrorMessages.required
        },
        pattern: {
            value: regExps.login,
            message: validationErrorMessages.login
        }
    },
    password: {
        required: {
            value: true,
            message: validationErrorMessages.required
        },
        pattern: {
            value: regExps.password,
            message: validationErrorMessages.password
        }
    },
}