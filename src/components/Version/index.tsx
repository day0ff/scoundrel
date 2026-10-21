import {FC} from "react";
import {APP_VERSION} from "constants.ts";
import {VersionPropsType} from "./types.ts";
import {VersionStyled} from "./styles.ts";

const Version:FC<VersionPropsType> = ({className}) => {
    return (
        <VersionStyled className={className}>
            v{APP_VERSION}
        </VersionStyled>
    );
}

export default Version;