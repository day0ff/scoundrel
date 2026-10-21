import {FC} from "react";
import {TypewriterStyled, TypewriterLetterStyled} from "./styles.ts";
import {TypewriterPropsType} from "./types.ts";

const Typewriter: FC<TypewriterPropsType> = (
    {
        speed = 0.1,
        delay = 0.2,
        children
    }
) => {
    return (
        <TypewriterStyled>
            {children?.split("").map((char, index) => char !== '\u000A' ? (
                <TypewriterLetterStyled key={index} $delay={delay + index * speed} $speed={speed}>
                    {char}
                </TypewriterLetterStyled>
            ) : '\u000A')}
        </TypewriterStyled>
    );
};

export default Typewriter;