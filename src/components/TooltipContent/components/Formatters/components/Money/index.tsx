import {CSSProperties, FC, useMemo} from "react";
import {moneyFormatNumber} from "helpers";
import {ScoreWrapperStyled, ScoreCharStyled, ScoreShadowStyled, ScoreShadowCharStyled} from "./styles.ts";
import {ScoreTagPropsType} from "./types.ts";

const getStyle = (char: string, fontSize: number, delay: number): CSSProperties => {
    const style: CSSProperties = {
        fontSize: `${fontSize}%`,
        '--delay': `${delay}s`,
    };

    if (char === ' ') return style;

    if (char === ',') {
        style.marginInlineStart = -2;
        style.marginInlineEnd = -6;
    }

    return style
};

const Money: FC<ScoreTagPropsType> = ({className, color = 'gold', minDelay = 2, threshold = 10_000_000_000, children}) => {
    const text = String(children) === 'Infinity' ? 'Infinity' : moneyFormatNumber(Number(children), threshold);

    const options = useMemo(
        () => {
            let delay = minDelay + Math.random() * 3;
            let group = 1;

            return text.split("").map((char) => {
                if (char === ' ' || char === '.' || char === ',') group += 1;
                if (char !== '.' && char !== ' ') delay += 0.2;

                const fontSize = Math.floor(200 - 100 * (group ** 0.3));

                return {
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
                        const {fontSize, delay} = options[index];

                        if (char === ' ') return;

                        const style = getStyle(char, fontSize, delay);

                        return (
                            <ScoreShadowCharStyled
                                key={index}
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
                    const {delay, fontSize} = options[index];

                    if (char === ' ') return;

                    const style = getStyle(char, fontSize, delay);

                    return (
                        <ScoreCharStyled
                            key={index}
                            $color={color}
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

export default Money;