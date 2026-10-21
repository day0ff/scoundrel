import {useEffect, useState} from "react";

export const useFullScreenObserver = () => {
    const [isFullScreen, setIsFullScreen] = useState(Boolean(document.fullscreenElement));

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullScreen(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        handleFullscreenChange();

        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    return isFullScreen;
}
