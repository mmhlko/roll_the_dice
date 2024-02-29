export const getGameHeaderTitle = (gameDisabled: boolean, gameFinished: boolean, diceResult: number | null, isRolling: boolean) => {
    return gameDisabled
        ? "Войдите, чтобы продолжить"
        : gameFinished
            ? diceResult ? `Результат броска кубика: ${diceResult}` : ""
            : isRolling
                ? "Бросок!"
                : "Сделайте ставку"
}

export const getGameHeaderSubtitle = (gameSuccess: boolean, score: number) => {
    return gameSuccess
        ? `Вы выиграли ${score} TND!`
        : `Повезет в следующий раз!`
}

export const getReRollClassName = (diceResult: number | null) => diceResult ? `dice-show-same-${diceResult}` : ""