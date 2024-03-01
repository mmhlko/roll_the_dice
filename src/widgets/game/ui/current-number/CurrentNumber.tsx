import { useAppDispatch, useAppSelector } from "src/app/store/hookTypes";
import { gameActions } from "../../model/gameSlice";

export const NumberVariantValue = () => {
    const { betCurrentNumber } = useAppSelector(state => state.game)
    const dispatch = useAppDispatch();
    const handleCountClick = () => {
        betCurrentNumber === 6
            ? dispatch(gameActions.setBetNumber(1))
            : dispatch(gameActions.setBetNumber(betCurrentNumber + 1))
    }
    return (
        <span onClick={handleCountClick}>
            {betCurrentNumber}
        </span>
    )
}