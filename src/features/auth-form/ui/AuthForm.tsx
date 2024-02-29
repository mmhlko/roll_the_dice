import { useForm } from 'react-hook-form';
import { Form, FormInput } from 'src/entries/form';
import { Button } from 'src/shared/ui/button/Button';
import { fetchLoginUser } from '../model/userSlice';
import { useAppDispatch } from 'src/app/store/hookTypes';
import { setModal } from 'src/entries/modal/model/modalSlice';

export const AuthForm = () => {

    const { handleSubmit, formState: { errors }, register} = useForm({ mode: 'onBlur' });
    const dispatch = useAppDispatch();

    const cbSubmitFormLogin = (formData: any) => {
        console.log("cbSubmitFormLogin", formData);        
        dispatch(fetchLoginUser(formData))
            .then(() => {
                dispatch(setModal(false))
            })
    }

    const formRegister = (id: string) => register(id, {
        required: {
            value: true,
            message: "Обязательное поле"
        }})

    return (
        <Form handleForm={handleSubmit(cbSubmitFormLogin)}>
            <FormInput
                {...formRegister("login")}
                id='login'
                type='text'
                placeholder='Login'
                autoComplete="none"
                validationError={errors?.login?.message as string}
            />
            <FormInput    
                {...formRegister("password")}            
                id='password'
                type='password'                
                placeholder='Password'
                validationError={errors?.password?.message as string}
            />
            <Button type='submit' wide>Войти</Button>
        </Form>

    );
}