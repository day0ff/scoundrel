import {cloneElement, FC, SyntheticEvent, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import {
    ModalBackButtonStyled,
    ModalContentStyled,
    ModalPixelCardStyled,
    ModalStyled
} from "./styles.ts";
import {ModalStackItemProps, ModalStackPropsType} from "./types.ts";
import {MODAL_BACKDROP_DURATION_MS} from "./constants.ts";

const ModalStack: FC<ModalStackPropsType> = ({$color, $size, initialNode, isOpen, isClosable = true, onClose, ...restProps}) => {
    const {t} = useTranslation();
    const backButtonSounds = useButtonSounds<HTMLButtonElement>();
    const [history, setHistory] = useState<Array<ModalStackItemProps>>([initialNode]);
    const [closing, setClosing] = useState(false);
    const pendingHistoryRef = useRef<Array<ModalStackItemProps> | null>(null);

    const handleNavigate = (nextHistory: Array<ModalStackItemProps>) => {
        if (!isOpen || closing || pendingHistoryRef.current) return;
        // Keep the outgoing content and its dimensions until the dialog closes.
        pendingHistoryRef.current = nextHistory;
        setClosing(true);
    }

    const handlePush = (newNode: ModalStackItemProps) => {
        handleNavigate([...history, newNode]);
    }

    const handleBack = (event: SyntheticEvent) => {
        event.preventDefault();
        if (history.length > 1) handleNavigate(history.slice(0, -1));
        else if (isClosable) setClosing(true);
    }

    const handleClose = (event: Event) => {
        const nextHistory = pendingHistoryRef.current;
        pendingHistoryRef.current = null;
        if (nextHistory && isOpen) {
            setHistory(nextHistory);
            setClosing(false);
            return;
        }

        setHistory(previous => [previous[0]]);
        setClosing(false);
        onClose?.(event);
    }

    const currentNode = history[history.length - 1];

    return (
        <ModalStyled $size={$size} {...restProps} isOpen={isOpen && !closing} isClosable={isClosable && !closing}
                     animationDuration={MODAL_BACKDROP_DURATION_MS} onClose={handleClose}>
            <ModalPixelCardStyled $color={$color} $size={$size}/>
            <ModalContentStyled $size={$size} inert={closing}>
                {cloneElement(currentNode, {
                    onPush: handlePush,
                    onBack: handleBack
                })}
                <ModalBackButtonStyled {...backButtonSounds} disabled={history.length === 1 && !isClosable} onClick={(event) => {
                    backButtonSounds.onClick(event);
                    handleBack(event);
                }}>
                    {t`button.back.text`}
                </ModalBackButtonStyled>
            </ModalContentStyled>
        </ModalStyled>
    );
}

export default ModalStack;
