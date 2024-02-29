import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from "react"
import "./index.scss"
import classNames from "classnames";

interface IButtonInterface extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color?: "purple" | "green",
    wide?: boolean,
}
export const Button = memo(({ children, onClick, disabled, color="purple", wide}: IButtonInterface) => {

    return (
        <button onClick={onClick} disabled={disabled} className={classNames(
            "button",
            {
                [`button_color_${color}`]: color,
                [`button_wide`]: wide,
            }
        )}>
            {children}
        </button>
    );
})