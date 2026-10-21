import {useCallback, useState, type FC} from "react";
import AudioWaveform from "./components/AudioWaveform";
import Wordmark from "./components/Wordmark";
import {ContainerStyled} from "./styles.ts";
import type {DayoffLogoPropsType} from "./types.ts";

const DayoffLogo: FC<DayoffLogoPropsType> = ({className, onEnded, onError}) => {
    const [dark, setDark] = useState(false);
    const toggleColor = useCallback(() => setDark(value => !value), []);

    return (
        <ContainerStyled className={className} $dark={dark}>
            <AudioWaveform onIntroColorChange={toggleColor} onEnded={onEnded} onError={onError}/>
            <Wordmark dark={dark} onColorChange={toggleColor}/>
        </ContainerStyled>
    );
};

export default DayoffLogo;
