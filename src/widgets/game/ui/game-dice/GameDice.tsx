import s from "./styles.module.scss"
import "./dice.scss"
import { useEffect, useRef } from "react"
import { DICE_ROLLING_TIME, diceConfig } from "../../lib/constants"
import { IGameDiceSide } from "src/shared/types/gameTypes"
import { getReRollClassName } from "../../lib/helpers"

interface IGameDiceProps {
    diceResult: number | null,
    dicePrevResult: number | null,
    isRolling: boolean,
}

export const GameDice = ({ diceResult, dicePrevResult, isRolling }: IGameDiceProps) => {

    const refDice = useRef<HTMLDivElement>(null);

    const diceRender = ({ side, dots }: IGameDiceSide) => (
        <div id={`dice-side-${side}`} className={`dice__side dice__num-${side}`} key={side}>
            {new Array(dots).fill(<></>).map((_, index) => (
                <div className={`dice__dot  dice__${side}-${index + 1}`} key={side + index}></div>
            ))}
        </div>
    )


    const rollDice = () => {
        const reRollClass = getReRollClassName(diceResult)
        const oldRollClass = getReRollClassName(dicePrevResult)
        const diceClassList = refDice.current?.classList
        const isReRollClassExist = diceClassList?.contains(reRollClass)

        document.getElementById("dice_wrapper")?.classList.add("dice_wrapper")
        setTimeout(() => {
            document.getElementById("dice_wrapper")?.classList.remove("dice_wrapper")
        }, DICE_ROLLING_TIME/2);

        

        if (dicePrevResult) {
            if (diceResult !== dicePrevResult) {
                diceClassList?.remove(oldRollClass)
                diceClassList?.remove('dice-show-' + dicePrevResult)
                diceClassList?.add('dice-show-' + diceResult)
            } else {
                isReRollClassExist
                    ? diceClassList?.remove(oldRollClass)
                    : diceClassList?.add(reRollClass)
            }
        } else {
            diceClassList?.add('dice-show-' + diceResult)
        }
    }

    useEffect(() => {
        isRolling && rollDice()
    }, [isRolling])

    return (
        <div className={s.wrapper}>
            <div id="dice_wrapper" className="dice_rolling">
            <div ref={refDice} id='dice' className="dice" style={{ transition: `transform ${DICE_ROLLING_TIME}ms` }}>
                {diceConfig.map(diceRender)}
            </div>
            </div>
        </div>
    )
}