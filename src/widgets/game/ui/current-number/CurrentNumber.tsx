import { useAppDispatch, useAppSelector } from "src/app/store/hookTypes";
import { setBetNumber } from "../../model/gameSlice";

export const NumberVariantValue = () => {
    const { betCurrentNumber } = useAppSelector(state => state.game)
    const dispatch = useAppDispatch();
    const handleCountClick = () => {
        betCurrentNumber === 6
            ? dispatch(setBetNumber(1))
            : dispatch(setBetNumber(betCurrentNumber + 1))
    }
    return (
        <span onClick={handleCountClick}>
            {betCurrentNumber}
        </span>
    )
}