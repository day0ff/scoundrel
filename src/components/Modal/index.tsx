import {FC, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ModalPropsType} from "./types.ts";
import {ModalCloseButton, ModalCloseButtonIcon, ModalStyled} from "./styles.ts";

const Modal: FC<ModalPropsType> = ({isOpen, isClosable = true, showCloseButton= false, animationDuration = 0, ref, children, onClose, ...props}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [visible, setVisible] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement, []);

    const handleCloseClick = useCallback(() => {
        if (closeTimerRef.current !== undefined || !dialogRef.current?.open) return;
        setVisible(false);
        const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : animationDuration;
        if (!duration) dialogRef.current?.close();
        else closeTimerRef.current = setTimeout(() => {
            closeTimerRef.current = undefined;
            dialogRef.current?.close();
        }, duration);
    }, [animationDuration]);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        // Open or close when `open` prop changes
        if (isOpen) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = undefined;
            if (!dialog.open) dialog.showModal();
            // Commit the hidden state before starting the entrance transition.
            void dialog.getBoundingClientRect();
            setVisible(true);
        } else {
            handleCloseClick();
        }
    }, [isOpen, handleCloseClick]);

    useEffect(() => () => clearTimeout(closeTimerRef.current), []);

    useEffect(() => {
        const dialog = dialogRef.current;

        const handleClose = (event: Event) => {
            // Ignore the queued close event when fullscreen reopens the dialog.
            if (dialog?.open) return;
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = undefined;
            setVisible(false);
            onClose?.(event);
        }

        const handleCancel = (event: Event) => {
            event.preventDefault();
            if (isClosable) handleCloseClick();
        };

        const handleClick = (event: MouseEvent) => {
            if (!isClosable) return;
            // A fullscreen transition can move the dialog during this click.
            if (event.target !== dialog) return;

            const dialogDimensions = dialog?.getBoundingClientRect();

            if (!dialogDimensions) return;

            if (
                event.clientX < dialogDimensions.left ||
                event.clientX > dialogDimensions.right ||
                event.clientY < dialogDimensions.top ||
                event.clientY > dialogDimensions.bottom
            ) {
                handleCloseClick();
            }
        }

        dialog?.addEventListener("click", handleClick)
        dialog?.addEventListener("close", handleClose);
        dialog?.addEventListener("cancel", handleCancel);

        return () => {
            dialog?.removeEventListener("click", handleClick);
            dialog?.removeEventListener("close", handleClose);
            dialog?.removeEventListener("cancel", handleCancel);
        };
    }, [isClosable, onClose, handleCloseClick]);

    useEffect(() => {
        const dialog = dialogRef.current;
        const handleFullscreenChange = () => {
            if (!isOpen || !dialog?.open) return;

            // Put the dialog above the newly added fullscreen element.
            const focusedElement = document.activeElement;
            dialog.close();
            dialog.showModal();
            if (focusedElement instanceof HTMLElement && dialog.contains(focusedElement)) {
                focusedElement.focus({preventScroll: true});
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, [isOpen]);

    return (
        <ModalStyled
            ref={dialogRef}
            {...props}
            data-modal-visible={visible}
        >
            {isClosable && showCloseButton && (
                <ModalCloseButton onClick={handleCloseClick}>
                    <ModalCloseButtonIcon/>
                </ModalCloseButton>
            )}
            {children}
        </ModalStyled>
    );
}

export default Modal;
