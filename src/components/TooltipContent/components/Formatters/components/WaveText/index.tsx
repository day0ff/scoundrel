import {FC, useMemo} from "react";
import {WaveStyled, WaveCharStyled, WaveShadow} from "./styles.ts";
import {WaveTagPropsType} from "./types.ts";


const Wave: FC<WaveTagPropsType> = ({delay = 0.2, children, className}) => {
    const text = String(children);

    const delays = useMemo(
        () => {
            return text.split("").map((_, index) => delay + index * 0.1)
        },
        [delay, text]
    );

    return (
        <WaveStyled className={className}>
            <WaveShadow>
                {text.split("").map((char, index) => char !== '\u000A' ? (
                    <WaveCharStyled key={index} $delay={delays[index]}>
                        {char === " " ? " " : char}
                    </WaveCharStyled>
                ) : '\u000A')}
            </WaveShadow>
            {text.split("").map((char, index) => char !== '\u000A' ? (
                <WaveCharStyled key={index} $delay={delays[index]}>
                    {char === " " ? " " : char}
                </WaveCharStyled>
            ) : '\u000A')}
        </WaveStyled>
    );
};

export default Wave;
