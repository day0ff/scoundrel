import {useEffect, useState, type FC} from "react";
import {useTransition} from "@react-spring/web";
import {useMediaQuery} from "react-responsive";
import type {PackBackgroundPropsType} from "./types.ts";
import {PackBackgroundStyled} from "./styles.ts";

const PackBackground: FC<PackBackgroundPropsType> = ({src}) => {
    const [loaded, setLoaded] = useState(src);
    const reducedMotion = useMediaQuery({query: "(prefers-reduced-motion: reduce)"});
    useEffect(() => {
        let cancelled = false;
        const image = new Image();
        image.onload = () => { if (!cancelled) setLoaded(src); };
        image.src = src;
        return () => { cancelled = true; image.onload = null; };
    }, [src]);
    const transitions = useTransition(loaded, {
        from: {opacity: 0}, enter: {opacity: 1}, leave: {opacity: 0},
        config: {duration: 350}, immediate: reducedMotion,
    });
    return transitions((style, url) => <PackBackgroundStyled aria-hidden="true" $url={url} style={style}/>);
};

export default PackBackground;
