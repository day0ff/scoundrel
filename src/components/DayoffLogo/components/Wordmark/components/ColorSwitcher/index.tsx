import type {FC} from "react";
import {InputStyled, SliderStyled, SwitchStyled} from "./styles.ts";
import type {ColorSwitcherPropsType} from "./types.ts";

const ColorSwitcher: FC<ColorSwitcherPropsType> = ({dark, onColorChange}) => (
    <SwitchStyled>
        <InputStyled
            type="checkbox"
            role="switch"
            aria-label="Dark logo colors"
            checked={dark}
            onChange={onColorChange}
        />
        <SliderStyled aria-hidden="true"/>
    </SwitchStyled>
);

export default ColorSwitcher;
