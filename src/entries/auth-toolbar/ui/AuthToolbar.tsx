import { Button } from "src/shared/ui/button/Button"
import s from './styles.module.scss';
import { useAppDispatch } from "src/app/store/hookTypes";
import { setModal } from "../../modal/model/modalSlice";

export const AuthToolbar = () => {
    const dispatch = useAppDispatch();
    const handleLoginClick = () => {
        dispatch(setModal(true))
    }
    return (
        <div className={s.auth_wrapper}>
            <Button onClick={handleLoginClick}>Вход</Button>
            <Button>Регистрация</Button>
        </div>
    )
}



