import {FC} from "react";
import {
    USAGE_COMPONENTS_MAP
} from "components/TooltipContent/components/Usage/constatnts.tsx";
import {UsageTagEnumerationType} from "components/TooltipContent/components/Usage/types.ts";
import {UsageLabelStyled} from "./styles.ts";
import {UsageLabelPropsType} from "./types.ts";


const UsageLabel:FC<UsageLabelPropsType> = ({identifier, payload, appendTo}) => {
    const usageTagName = identifier.split("-")[1] as UsageTagEnumerationType;
    const UsageTagComponent = USAGE_COMPONENTS_MAP[usageTagName];

    return UsageTagComponent && (
        <UsageLabelStyled>
            <UsageTagComponent appendTo={appendTo ?? 'parent'}>
                {String(payload) as any}
            </UsageTagComponent>
        </UsageLabelStyled>
    );
}

export default UsageLabel;