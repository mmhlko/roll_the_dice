import classNames from 'classnames';
import s from './styles.module.scss';
import { MouseEvent, ReactNode } from "react"
import CloseBtn from "../assets/close_btn.svg"

interface TModalProps {
    isOpened: boolean,
    onClose: () => void,
    children: ReactNode,
}

export const Modal = ({ isOpened, onClose, children }: TModalProps) => {
    const handleCloseModal = () => {
        onClose()
    }
    const handleClickModalBody = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    return (
        <div className={classNames(s.modal, { [s.modal_hidden]: !isOpened })} onMouseDown={handleCloseModal}>
            <div className={s.modal_wrapper} onMouseDown={handleClickModalBody}>
                <span className={s.close_button} onClick={handleCloseModal}>
                    <CloseBtn />
                </span>
                {children}
            </div>
        </div>
    )
}