import { Modal } from 'src/entries/modal/ui/Modal'
import { AuthForm } from 'src/features/auth-form'
import { Game } from 'src/widgets/game/ui/game'
import { Header } from 'src/widgets/header/Header'
import { useAppDispatch, useAppSelector } from './store/hookTypes'
import { setModal } from 'src/entries/modal/model/modalSlice'
import { memo, useEffect } from 'react'
import { fetchAuthCheck } from 'src/features/auth-form/model/userSlice'
import { Spinner } from 'src/shared/ui/spinner/Spinner'

const App = () => {

    const isModalOpened = useAppSelector(state => state.modal.isOpened)
    const {fetchAuthCheckRequest: authCheking, data:user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const handleCloseModal = () => dispatch(setModal(false))  

    useEffect(() => {
        dispatch(fetchAuthCheck())
    }, [])

    return (
        <>
            {!authCheking
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
