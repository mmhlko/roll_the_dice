import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCalculateGameAction } from "./types";
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
    balance: 100,
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
        onChangeBetAmount: (state, action: PayloadAction<number>) => {
            state.betAmount = action.payload;
        },
        onChangeBetVariant: (state, action: PayloadAction<string>) => {
            state.betVariant = action.payload
        },
        setBetNumber: (state, action: PayloadAction<number>) => {
            state.betCurrentNumber = action.payload
        },
        calculateGameRound: (state, action: PayloadAction<TCalculateGameAction>) => {
            state.isRolling = false
            const {betAmount, betCurrentNumber, betVariant, diceResult} = action.payload
            const {isGameSuccess, gameScore, newBalance} = getGameRoundResult(betVariant, betAmount, betCurrentNumber, state.balance, diceResult)
            state.balance = newBalance
            state.score = gameScore
            state.gameSuccess = isGameSuccess
            state.gameFinished = true
            state.isRolling = false
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

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;