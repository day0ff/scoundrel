import {useEffect, useState, type FC} from "react";
import {toastFadeIn, ToastMessageContentStyled, ToastMessageStyled} from "./styles.ts";
import type {ToastMessagePropsType} from "./types.ts";

const ToastMessage: FC<ToastMessagePropsType> = ({message, onClose}) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() !== "c" || event.repeat || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
            const target = event.target;
            if (target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), dialog')) return;
            event.preventDefault();
            setClosing(true);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <ToastMessageStyled
            $size={2}
            $width={4}
            $color="#f4d77f"
            $closing={closing}
            tabIndex={0}
            aria-keyshortcuts="C"
            onContextMenu={event => {
                event.preventDefault();
                setClosing(true);
            }}
            onAnimationEnd={event => {
                if (event.target === event.currentTarget && event.animationName !== toastFadeIn.getName()) onClose();
            }}
        >
            <ToastMessageContentStyled>{message}</ToastMessageContentStyled>
        </ToastMessageStyled>
    );
};

export default ToastMessage;
