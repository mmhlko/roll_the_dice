export type TVariantTab = {
    id: string,
    title: string,
    wide?: Boolean
}

export enum BETS  {
    EVEN = "even",
    ODD = "odd",
    ONE_THREE = "one_to_three",
	FOUR_SIX = "four_to_six",
    NUMBER = "number",
}

export type TCalulateGameAction = {
    betVariant: string, 
    betAmount: number, 
    betCurrentNumber: number,
    diceResult: number
}