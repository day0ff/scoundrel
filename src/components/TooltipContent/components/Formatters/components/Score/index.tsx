import {CSSProperties, FC, useMemo} from "react";
import {scoreFormatNumber} from "helpers";
import {ScoreWrapperStyled, ScoreCharStyled, ScoreShadowStyled, ScoreShadowCharStyled} from "./styles.ts";
import {ScoreTagPropsType} from "./types.ts";

const getStyle = (char: string, fontSize: number, delay: number): CSSProperties => {
    const style: CSSProperties = {
        fontSize: `${fontSize}%`,
        '--delay': `${delay}s`,
    };

    if (char === ' ' || char === '^') return style;

    if (char === ',') {
        style.marginInlineStart = -2;
        style.marginInlineEnd = -6;
    }
    if (char === '×') {
        style.marginInlineStart = -1;
        style.marginInlineEnd = -4;
    }

    return style
};

const Score: FC<ScoreTagPropsType> = ({className, unit = '¢', color = 'cadetblue', shine = 'white', minDelay = 2, threshold = 10_000_000_000, children}) => {
    const text = String(children) === 'Infinity' ? unit + 'Infinity' : unit + scoreFormatNumber(Number(children), threshold);

    const options = useMemo(
        () => {
            let delay = minDelay + Math.random() * 3;
            let group = 1;
            let isPower = false;

            return text.split("").map((char) => {

                if (char === ' ' || char === '.' || char === ',') group += 1;
                if (char === '^') {
                    isPower = true;
                    group += 5;
                }
                if (char !== '.' && char !== ' ') delay += 0.2;

                const fontSize = Math.floor(200 - 100 * (group ** 0.2));

                if (char === '×') group = 1;

                return {
                    isPower,
                    delay,
                    fontSize
                };
            })
        },
        [minDelay, text]
    );

    return (
        <ScoreWrapperStyled className={className}>
            <ScoreShadowStyled>
                {
                    text.split("").map((char, index) => {
                        const {isPower, fontSize, delay} = options[index];

                        if (char === ' ' || char === '^') return;

                        const style = getStyle(char, fontSize, delay);

                        return (
                            <ScoreShadowCharStyled
                                key={index}
                                $isPower={isPower}
                                style={style}
                            >
                                {char === ' ' || char === "." ? <>&thinsp;</> : char}
                            </ScoreShadowCharStyled>
                        )
                    })
                }
            </ScoreShadowStyled>
            {
                text.split("").map((char, index) => {
                    const {isPower, delay, fontSize} = options[index];

                    if (char === ' ' || char === '^') return;

                    const style = getStyle(char, fontSize, delay);

                    return (
                        <ScoreCharStyled
                            key={index}
                            $isPower={isPower}
                            $color={color}
                            $shine={shine}
                            style={style}
                        >
                            {char === ' ' || char === "." ? <>&thinsp;</> : char}
                        </ScoreCharStyled>
                    )
                })
            }
        </ScoreWrapperStyled>
    );
};

export default Score;