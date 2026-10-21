import {FC, useMemo} from "react";
import {WaveStyled, WaveCharStyled, WaveShadow, WaveShadowCharStyled} from "./styles.ts";
import {WaveTagPropsType} from "./types.ts";

const WaveTypewriter: FC<WaveTagPropsType> = ({delay = 0.2, speed = 0.1, children, className}) => {
    const text = String(children);

    const delays = useMemo(
        () => {
            return text.split("").map((_, index) => delay + index * speed)
        },
        [delay, speed, text]
    );
    return (
        <WaveStyled className={className}>
            <WaveShadow>
                {text.split("").map((char, index) => char !== '\u000A' ? (
                    <WaveShadowCharStyled key={index} $delay={delays[index]} $speed={speed}>
                        {char === " " ? " " : char}
                    </WaveShadowCharStyled>
                ) : '\u000A')}
            </WaveShadow>
            {text.split("").map((char, index) => char !== '\u000A' ? (
                <WaveCharStyled key={index} $delay={delays[index]} $speed={speed}>
                    {char === " " ? " " : char}
                </WaveCharStyled>
            ) : '\u000A')}
        </WaveStyled>
    );
};

export default WaveTypewriter;
