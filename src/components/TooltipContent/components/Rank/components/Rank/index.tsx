import {FC} from "react";
import {RankType} from "entities/types.ts";
import Tooltip from "components/Tooltip";
import {getRankTagProps} from "./constants.ts";
import {RankPropsType} from "./types.ts";
import {RankStyled} from "./styled.ts";

const Rank: FC<RankPropsType> = ({isRoot, appendTo, className, children}) => {
    const [rank] = (typeof children === 'string' ? children : children?.[0])?.split(".") ?? []
    const {description} = getRankTagProps(rank as RankType) ?? {};

    return isRoot ? (<RankStyled className={className}>{children}</RankStyled>) : (
        <Tooltip translationKey={description} appendTo={appendTo ?? 'parent'}>
            <RankStyled className={className}>{children}</RankStyled>
        </Tooltip>
    );
};

export default Rank;