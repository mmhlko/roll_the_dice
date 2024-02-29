import Select, { SingleValue } from 'react-select'
import "./custom.scss"
import { betOptions } from 'src/widgets/game/lib/constants'
import { ISelectOption } from 'src/shared/types/gameTypes'

interface ISelectorProps {
    onChange: (option: SingleValue<ISelectOption>) => void,
    title?: string,
}

export const Selector = ({ onChange, title }: ISelectorProps) => {

    return (
        <div>
            <p className="custom-select__title">{title}</p>
            <Select
            classNamePrefix="custom-select"
            className="font_black wide"
            defaultValue={betOptions[0]}
            autoFocus={false}
            isSearchable={false}
            closeMenuOnScroll={false}
            options={betOptions}
            onChange={onChange}
        />
        </div>
    )
} 