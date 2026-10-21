import {FC} from "react";

import Tooltip from "components/Tooltip";
import {getSuitTagProps} from "./constants.ts";
import {SuitIconNamesType, SuitPropsType} from "./types.ts";
import {SuitImage} from "./styled.ts";

const Suit: FC<SuitPropsType> = ({isRoot, appendTo, className, children}) => {
    const [name] = (typeof children === 'string' ? children : children?.[0])?.split(".") ?? []
    const {description, src} = getSuitTagProps(name as SuitIconNamesType) ?? {};

    return isRoot ? (<SuitImage className={className} src={src}/>) : (
        <Tooltip translationKey={description} appendTo={appendTo ?? 'parent'}>
            <SuitImage className={className} src={src}/>
        </Tooltip>
    );
};

export default Suit;