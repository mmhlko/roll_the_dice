export type TUserResponse= {
    id: number,
    login: string,
    balance: number,
    active: boolean,
    createdAt: string,
    roleId: number,
    statusId: null | number,
    currencyId: number,
    isPaymentSystemUser: boolean,
    role: string,
    permission: {
        canAddSameRole: boolean,
        canTransaction: boolean,
        canCreateRoles: null | boolean
    },
    currency: string,
    path: string
}

export type TLoginFormData = {
    login: string,
    password: string
}