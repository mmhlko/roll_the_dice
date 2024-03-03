export interface ISelectOption {
    readonly value: string,
    readonly label: string
}
export interface IGameDiceSide {
    side: string, 
    dots: number
}

export type TVariantTab = {
    id: string,
    title: string,
    wide?: boolean
}

export enum BETS  {
    EVEN = "even",
    ODD = "odd",
    ONE_THREE = "one_to_three",
	FOUR_SIX = "four_to_six",
    NUMBER = "number",
}