import classNames from "classnames";
import s from "./styles.module.scss";
import { ReactNode, memo } from "react";
import { NumberVariantValue } from "../current-number/CurrentNumber";
import { BETS, TVariantTab } from "src/shared/types/gameTypes";

type TRadioListProps = {
    tabs: TVariantTab[],
    name: string,
    action: (arg: string) => void,
    children?: ReactNode,
    title: string,
    defaultChecked?: boolean
}

export const GameVariants = memo(({ name, tabs, action, title, children }: TRadioListProps) => {   

    const returnSortListItem = (item: TVariantTab, index: number) => {
        const handleInputChange = () => {
            action(item.id)
        }       

        return (
            <li key={index} className={classNames({ [s.wide]: item.wide })}>
                <input
                    onChange={handleInputChange}
                    type="radio"
                    id={item.id + index}
                    name={name}
                    value={item.id}
                />
                <label
                    htmlFor={item.id + index}
                    className="button button_color_purple"
                >
                    {item.id === BETS.NUMBER
                        ? <>
                            {item.title}
                            <NumberVariantValue />
                        </>
                        : item.title
                    }

                </label>
            </li>
        )
    }

    return (
        <div className={s.wrapper}>
            <p>{title}</p>
            <ul className={s.radio_list}>
                {tabs.map(returnSortListItem)}
            </ul>
            {children}
        </div>
    )
})