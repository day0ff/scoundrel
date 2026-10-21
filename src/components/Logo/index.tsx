import {FC} from "react";
import {BASE_URL} from "constants.ts";
import {
    LogoImageStyled,
    LogoStyled
} from "./styles.ts";
import {LogoSwitcherPropsType} from "./types.ts";

const src = `${BASE_URL}/icons/logo.png`;

const Logo: FC<LogoSwitcherPropsType> = ({className}) => {
    return (
        <LogoStyled className={className} href={"https://www.dayoff.games/"} target={"_blank"}>
            <LogoImageStyled src={src} alt={"dayoff.games"} />
        </LogoStyled>
    );
};

export default Logo;