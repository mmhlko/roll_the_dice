import { createSlice } from "@reduxjs/toolkit";
import { TStoreAction } from "src/shared/types/storeTypes";
import { TCalulateGameAction } from "./types";
import { getGameRoundResult } from "../lib/getGameRoundResult";

export interface IGameState {
    balance: number,
    betAmount: number,
    betVariant: string | null,
    betCurrentNumber: number,
    diceResult: number | null,
    dicePrevResult: number | null,
    score: number | null,
    gameFinished: boolean,
    gameSuccess: boolean,
    isRolling: boolean,
    roundCount: number
}

const initialState: IGameState = {
    balance: 0,
    betAmount: 1,
    betVariant: null,
    betCurrentNumber: 1,
    diceResult: null,
    dicePrevResult: null,
    score: null,
    gameFinished: false,
    gameSuccess: false,
    isRolling: false,
    roundCount: 0
}

const sliceName = "game";

export const gameSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        onChangeBetAmount: (state, action: TStoreAction<number>) => {
            state.betAmount = action.payload;
        },
        onChangeBetVariant: (state, action: TStoreAction<string>) => {
            state.betVariant = action.payload
        },
        setBetNumber: (state, action: TStoreAction<number>) => {
            state.betCurrentNumber = action.payload
        },
        setUserBalance: (state, action: TStoreAction<number>) => {
            state.balance = action.payload
        },
        calculateGameRound: (state, action: TStoreAction<TCalulateGameAction>) => {
            state.isRolling = false
            const {betAmount, betCurrentNumber, betVariant, diceResult} = action.payload
            const {isGameSuccess, gameScore, newBalance} = getGameRoundResult(betVariant, betAmount, betCurrentNumber, state.balance, diceResult)
            state.balance = newBalance
            state.score = gameScore
            state.gameSuccess = isGameSuccess
            state.gameFinished = true
            state.isRolling = false
            //state.diceResult = null
        },
        getDiceResult: (state) => {
            state.dicePrevResult = state.diceResult
            state.diceResult = Math.floor(Math.random() * 6) + 1;
            state.roundCount++
        },
        rollDiceStart: (state) => {
            state.gameFinished = false
            state.isRolling = true
        },
    },
    
})

export const {
    onChangeBetAmount,
    onChangeBetVariant,
    setBetNumber,
    setUserBalance,
    calculateGameRound,
    getDiceResult,
    rollDiceStart
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;