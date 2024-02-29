import { Button } from "src/shared/ui/button/Button"
import s from "./styles.module.scss"
import classNames from "classnames"
import { GameVariants } from "./radio-list/RadioList"
import { Selector } from "src/shared/ui/select/Selector"
import { DICE_ROLLING_TIME, TABS } from "../lib/constants"
import { useAppDispatch, useAppSelector } from "src/app/store/hookTypes"
import { calculateGameRound, getDiceResult, onChangeBetAmount, onChangeBetVariant, rollDiceStart } from "../model/gameSlice"
import { SingleValue } from "react-select"
import { ISelectOption } from "src/shared/types/gameTypes"
import { GameDice } from "./game-dice/GameDice"
import { getGameHeaderSubtitle, getGameHeaderTitle } from "../lib/helpers"
import { useEffect } from "react"

interface IGameProps {
    disabled: boolean
}

export const Game = ({ disabled }: IGameProps) => {
    const dispatch = useAppDispatch();
    const { betVariant, betAmount, betCurrentNumber, diceResult, isRolling, dicePrevResult, roundCount, gameSuccess, score, gameFinished } = useAppSelector(state => state.game)
    const handleBetAmountChange = (option: SingleValue<ISelectOption>) => {
        dispatch(onChangeBetAmount(Number(option?.value)))
    }
    const handleBetVariantChange = (variant: string) => {
        dispatch(onChangeBetVariant(variant))
    }

    const handleBetConfirmClick = () => {
        dispatch(getDiceResult())
        dispatch(rollDiceStart())  
    }
    const disabledToBet = isRolling || !betVariant
    
    useEffect(() => {
        console.log("useEffect diceResult", diceResult);
        setTimeout(() => {
            betVariant && diceResult && dispatch(calculateGameRound({ betVariant, betAmount, betCurrentNumber, diceResult })) 
        }, DICE_ROLLING_TIME);
    }, [roundCount])

    return (
        <section className={s.game}>
            <div className={s.game__header}>
                <h2 className={s.title}>{getGameHeaderTitle(disabled, gameFinished, diceResult, isRolling)}</h2>
                <p className={s.subtitle}>{score && getGameHeaderSubtitle(gameSuccess, score)}</p>
            </div>
            <div className={classNames(s.game__body, { [s.disabled]: disabled })}>
                <GameDice diceResult={diceResult} dicePrevResult={dicePrevResult} isRolling={isRolling}/>
                <Selector onChange={handleBetAmountChange} title="Размер ставки" />
                <GameVariants
                    name="bets"
                    title="Варианты ставок"
                    action={handleBetVariantChange}
                    tabs={TABS}
                />
                <Button
                    color="green"
                    wide
                    onClick={handleBetConfirmClick}
                    disabled={disabledToBet}
                >
                    Сделать ставку
                </Button>
            </div>

        </section>
    )
}