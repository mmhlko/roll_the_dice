import s from "./styles.module.scss"
import { Button } from "src/shared/ui/button/Button"
import classNames from "classnames"
import { GameVariants } from "./game-variants/GameVariants"
import { Selector } from "src/shared/ui/selector/Selector"
import { DICE_ROLLING_TIME, TABS } from "../lib/constants"
import { useAppDispatch, useAppSelector } from "src/app/store/hookTypes"
import { gameActions } from "../model/gameSlice"
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
    const {
        betVariant,
        betAmount,
        betCurrentNumber,
        diceResult,
        isRolling,
        dicePrevResult,
        roundCount,
        gameSuccess,
        score,
        gameFinished,
        balance
    } = useAppSelector(state => state.game)
    const isNotEnoughBalance = betAmount > balance
    const disabledToBet = isRolling || !betVariant || isNotEnoughBalance
    const handleBetAmountChange = (option: SingleValue<ISelectOption>) => {
        dispatch(gameActions.onChangeBetAmount(Number(option?.value)))
    }
    const handleBetVariantChange = (variant: string) => {
        dispatch(gameActions.onChangeBetVariant(variant))
    }
    const handleBetConfirmClick = () => {
        dispatch(gameActions.getDiceResult())
        dispatch(gameActions.rollDiceStart())
    }
    useEffect(() => {
        setTimeout(() => {
            betVariant && diceResult && dispatch(gameActions.calculateGameRound({ betVariant, betAmount, betCurrentNumber, diceResult }))
        }, DICE_ROLLING_TIME);
    }, [roundCount])

    return (
        <section className={s.game}>
            <div className={s.game__header}>
                <h2 className={s.title}>{getGameHeaderTitle(disabled, gameFinished, diceResult, isRolling)}</h2>
                <p className={s.subtitle}>{score && getGameHeaderSubtitle(gameSuccess, score)}</p>
            </div>
            <div className={classNames(s.game__body, { [s.disabled]: disabled })}>
                <GameDice diceResult={diceResult} dicePrevResult={dicePrevResult} isRolling={isRolling} />
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
                    {isNotEnoughBalance
                        ? "Не хватает TND"
                        : "Сделать ставку"
                    }
                </Button>
            </div>
        </section>
    )
}