import s from "./styles.module.scss"
import { ForwardedRef, HTMLProps, forwardRef, memo } from "react";

type TUnitedInputElement = {
    validationError?: string
} & HTMLProps<HTMLInputElement>

export const FormInput = memo(forwardRef<HTMLInputElement, TUnitedInputElement>((
    { validationError, ...props }, ref) => {

        return (
        <div className={s.wrapper} >
            <input ref={ref as ForwardedRef<HTMLInputElement>} className={s.input} {...props} />
            {validationError && <p className={s.errorMessage}>{validationError}</p>}        
        </div>
    );
}))