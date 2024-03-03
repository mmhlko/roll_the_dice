import { useAppSelector } from "src/app/store/hookTypes"
import s from "./styles.module.scss"
import { AuthToolbar } from "src/entries/auth-toolbar"
import { UserBalance } from "src/entries/user-balance"

export const Header = () => {
    const { data: user, fetchAuthCheckRequest: authChecking} = useAppSelector(state => state.user)
    const balance = useAppSelector(state => state.game.balance)
    return (
        <header className={s.header}>
            <h3>Test game: Roll the Dice</h3>
            {!authChecking && user 
                ? <UserBalance balance={balance}/>
                : <AuthToolbar />
            }
        </header>
    )
}