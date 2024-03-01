import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "src/entries/form";
import { FormInput } from "src/entries/form-input";
import { Button } from "src/shared/ui/button/Button";
import { fetchLoginUser } from "../model/userSlice";
import { useAppDispatch, useAppSelector } from "src/app/store/hookTypes";
import { setModal } from "src/entries/modal/model/modalSlice";
import { validationRegister } from "../lib/validation";
import { Spinner } from "src/shared/ui/spinner/Spinner";
import { TLoginFormData } from "src/shared/types/authTypes";

export const AuthForm = () => {

    const { handleSubmit, formState: { errors }, register } = useForm({ mode: "onBlur" });
    const dispatch = useAppDispatch();
    const loadingLogin = useAppSelector(state => state.user.fetchLoginUserRequest)

    const cbSubmitFormLogin: SubmitHandler<TLoginFormData> = (formData) => {
        dispatch(fetchLoginUser(formData))
            .then(() => {
                dispatch(setModal(false))
            })
    }

    const formRegister = (id: "login" | "password") => register(id, validationRegister[id])

    return (
        <Form handleForm={handleSubmit(cbSubmitFormLogin)}>
            <FormInput
                {...formRegister("login")}
                id="login"
                type="text"
                placeholder="Login"
                autoComplete="none"
                validationError={errors?.login?.message as string}
            />
            <FormInput
                {...formRegister("password")}            
                id="password"
                type="password"
                placeholder="Password"
                validationError={errors?.password?.message as string}
            />
            <Button type="submit" wide>Войти</Button>
            {loadingLogin && <Spinner />}
        </Form>
    );
}