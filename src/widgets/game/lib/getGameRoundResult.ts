import { BETS } from "src/shared/types/gameTypes";

export const getGameRoundResult = (betVariant: string, betAmount: number, betCurrentNumber: number, balance: number, diceResult: number) => {
    let isGameSuccess = false;
    let gameScore: number;
    
    //определяем успех игры
    switch (betVariant) {
        case BETS.EVEN:
            isGameSuccess = diceResult % 2 === 0
            break
        case BETS.ODD:
            isGameSuccess = diceResult % 2 !== 0
            break
        case BETS.ONE_THREE:
            isGameSuccess = diceResult >= 1 && diceResult < 4
            break
        case BETS.FOUR_SIX:
            isGameSuccess = diceResult >= 4 && diceResult < 7
            break
        case BETS.NUMBER:
            isGameSuccess = diceResult === betCurrentNumber
            break
        default:
            break;
    }
    //определяем размер очков
    if (betVariant === BETS.NUMBER) {
        gameScore = isGameSuccess ? betAmount * 3 : betAmount
    } else {
        gameScore = isGameSuccess ? betAmount * 2 : betAmount
    }
    //считаем баланс
    
    const newBalance = +(isGameSuccess ? balance + gameScore : balance - gameScore).toFixed(2)
    
    return {
        diceResult, isGameSuccess, gameScore, newBalance
    }

}