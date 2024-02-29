import { ReactNode, memo } from 'react';
import s from './styles.module.scss'

interface IFormProps {
    handleForm: (data:any) => void, 
    children?: ReactNode, 
    title?: string
    align?: 'left' | 'center' | 'rigth'
}

export const Form = memo(({handleForm, children, title}: IFormProps) => {
   
    return ( 
        <form onSubmit={handleForm} className={s.form} >
            {title && <h3 className={s.title}>{title}</h3>}
            {children}
        </form>
     );
})