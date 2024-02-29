import { useEffect, useState } from "react";
import { BETS } from "../../model/types";

export const useGame = (betVariant: string, betAmount: number, betCurrentNumber: number) => {
    const [success, setSuccess] = useState(false);
    const [resultScore, setResultScore] = useState(0);
    let balance = 100
    const getDiceResult = () => Math.floor(Math.random() * 6) + 1 //get random from 1 to 6
    console.log("Dice", getDiceResult());
    

    useEffect(() => {
        switch (betVariant) {
            case BETS.EVEN:
                setSuccess(getDiceResult() % 2 === 0) 
                break
            case BETS.ODD:
                setSuccess(getDiceResult() % 2 !== 0) 
                break
            case BETS.ONE_THREE:
                setSuccess(getDiceResult() % 2 !== 0) 
                break
            case BETS.FOUR_SIX:
                setSuccess(getDiceResult() % 2 !== 0) 
                break
            case BETS.NUMBER:
                setSuccess(getDiceResult() === betCurrentNumber) 
                break
            default:
                break;
        }
    
        if (betVariant === BETS.NUMBER) {
            setResultScore(balance + betAmount * 3)
            balance = success ? resultScore : resultScore
        }
    }, [betCurrentNumber, betAmount, betVariant])

    return {
        success,
        resultScore,
        balance
    }
}