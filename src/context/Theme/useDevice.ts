import {useMediaQuery} from "react-responsive";
import {breakpoints, media} from "./constants.ts";

export const useDevice = () => {
    const isMobile = useMediaQuery({query: media.mobile});
    const isTablet = useMediaQuery({minWidth: breakpoints.mobile + 1, maxWidth: breakpoints.tablet});
    const isLaptop = useMediaQuery({minWidth: breakpoints.tablet + 1, maxWidth: breakpoints.laptop});
    const isDesktop = useMediaQuery({minWidth: breakpoints.laptop + 1, maxWidth: breakpoints.desktop});
    const isTV = useMediaQuery({query: media.tv});

    const isTabletCascade = useMediaQuery({query: media.tablet});
    const isLaptopCascade = useMediaQuery({query: media.laptop});
    const isDesktopCascade = useMediaQuery({query: media.desktop});

    return ({isMobile, isTablet, isLaptop, isDesktop, isTV, isTabletCascade, isLaptopCascade, isDesktopCascade});
}
