import { Modal } from "src/entries/modal/"
import { AuthForm } from "src/features/auth-form"
import { Game } from "src/widgets/game/"
import { Header } from "src/widgets/header/"
import { useAppDispatch, useAppSelector } from "./store/hookTypes"
import { memo, useEffect } from "react"
import { fetchAuthCheck } from "src/features/auth-form/model/userSlice"
import { Spinner } from "src/shared/ui/spinner/Spinner"
import { setModal } from "src/entries/modal/model/modalSlice";

const App = () => {

    const isModalOpened = useAppSelector(state => state.modal.isOpened)
    const {fetchAuthCheckRequest: authChecking, data:user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const handleCloseModal = () => dispatch(setModal(false))

    useEffect(() => {
        dispatch(fetchAuthCheck())
    }, [])

    return (
        <>
            {!authChecking
                ? <>
                    <Header />
                    <main>                        
                        <Game disabled={!user} />
                    </main>                    
                    <Modal isOpened={isModalOpened} onClose={handleCloseModal}>
                        <AuthForm />
                    </Modal>
                </>
                : <Spinner />
            }
        </>
    )
}

export default memo(App)