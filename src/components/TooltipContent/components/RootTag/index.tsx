import {FC} from "react";
import {RootTagComponentsType, RootTagComponentType, RootTagPropsType} from "./types.ts";
import {ROOT_TAG_COMPONENTS_MAP} from "./constants.tsx";

const regex = /<(\w+)>(.*?)<\/\1>/;
const splitRegexp = /(<\w+>.*?<\/\w+>)/;

const RootTag: FC<RootTagPropsType> = ({appendTo, children}) => {
    const match = children?.match(regex);

    if (!children || !match) return children;

    const tag = match[1] as RootTagComponentType;
    const inner = match[2];
    const [start, __ , end] = children.split(splitRegexp);

    const RootTagComponent = ROOT_TAG_COMPONENTS_MAP[tag] as RootTagComponentsType;

    return (
        <>
            {start}&thinsp;{
                RootTagComponent ? (
                    <RootTagComponent isRoot={true} appendTo={appendTo}>
                        {inner}
                    </RootTagComponent>
                ) : null
            }&thinsp;{end}
        </>

    );
}

export default RootTag;