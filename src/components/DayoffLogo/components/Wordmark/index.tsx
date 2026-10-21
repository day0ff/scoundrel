import type {FC} from "react";
import ColorSwitcher from "./components/ColorSwitcher";
import {WordmarkStyled} from "./styles.ts";
import type {WordmarkPropsType} from "./types.ts";

const Wordmark: FC<WordmarkPropsType> = ({dark, onColorChange}) => (
    <WordmarkStyled>
        <span aria-label="dayoff.games" role="group">
            <span aria-hidden="true">day</span>
            <ColorSwitcher dark={dark} onColorChange={onColorChange}/>
            <span aria-hidden="true">ff</span>
        </span>
    </WordmarkStyled>
);

export default Wordmark;
