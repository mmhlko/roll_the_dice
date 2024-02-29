interface IUserBalanceProps {
    balance: number
}

export const UserBalance = ({balance}: IUserBalanceProps) => (
    <span>{balance} (TND)</span>
)