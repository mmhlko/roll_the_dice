import { IGameDiceSide } from "src/shared/types/gameTypes"
import { BETS, TVariantTab } from "../model/types"

export const betOptions = [
    { value: "1", label: '1.00' },
    { value: "5", label: '5.00' },
    { value: "10", label: '10.00' },
    { value: "15", label: '15.00' },
    { value: "20", label: '20.00' },
]

export const TABS: TVariantTab[] = [
    {
        id: BETS.EVEN,
        title: "Чeтные",
        wide: false
    },
    {
        id: BETS.ODD,
        title: "Нечетные",
        wide: false
    },
    {
        id: BETS.ONE_THREE,
        title: "От 1 до 3",
        wide: false
    },
    {
        id: BETS.FOUR_SIX,
        title: "От 4 до 6",
        wide: false
    },
    {
        id: BETS.NUMBER,
        title: "Конкретное число",
        wide: true
    },
]

export const diceConfig: IGameDiceSide[] = [
    { side: "one", dots: 1 },
    { side: "two", dots: 2 },
    { side: "three", dots: 3 },
    { side: "four", dots: 4 },
    { side: "five", dots: 5 },
    { side: "six", dots: 6 },
]

export const DICE_ROLLING_TIME = 1000