import {useCallback, useEffect, useRef, useState, type FC} from "react";
import {createPortal} from "react-dom";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {dismissCollectionToast} from "store/features/collection-toasts";
import CollectionReveal from "./components/CollectionReveal";
import {currentCollectionToastSelector} from "./selectors.ts";
import {CollectionToastsStyled} from "./styles.ts";

const CollectionToasts: FC = () => {
    const toast = useAppSelector(currentCollectionToastSelector);
    const dispatch = useAppDispatch();
    const region = useRef<HTMLDivElement>(null);
    const [container] = useState(() => document.createElement("div"));
    const [visibleToastId, setVisibleToastId] = useState<string | null>(null);
    const handleClose = useCallback(() => {
        if (toast) dispatch(dismissCollectionToast(toast.id));
    }, [dispatch, toast]);

    useEffect(() => {
        const placeContainer = () => {
            const dialogs = document.querySelectorAll<HTMLDialogElement>("dialog[open]");
            const target = dialogs[dialogs.length - 1] ?? document.fullscreenElement ?? document.body;
            if (container.parentElement === target) return;
            if (region.current?.isConnected) region.current.hidePopover?.();
            target.append(container);
            region.current?.showPopover?.();
        };
        placeContainer();
        // Keep the toast interactive inside modal dialogs without restarting its reveal.
        const observer = new MutationObserver(placeContainer);
        observer.observe(document.body, {subtree: true, attributes: true, attributeFilter: ["open"], childList: true});
        document.addEventListener("fullscreenchange", placeContainer);
        return () => {
            observer.disconnect();
            document.removeEventListener("fullscreenchange", placeContainer);
            container.remove();
        };
    }, [container]);

    useEffect(() => {
        const element = region.current;
        // The top layer keeps notifications visible above native game-result dialogs.
        element?.showPopover?.();
        // Paint the opened popover at opacity zero before starting its transition.
        let secondFrame = 0;
        const firstFrame = requestAnimationFrame(() => {
            secondFrame = requestAnimationFrame(() => setVisibleToastId(toast?.id ?? null));
        });
        return () => {
            cancelAnimationFrame(firstFrame);
            cancelAnimationFrame(secondFrame);
            if (element?.isConnected) element.hidePopover?.();
        };
    }, [toast?.id]);

    if (!toast) return null;
    return createPortal(
        <CollectionToastsStyled ref={region} popover="manual">
            <CollectionReveal key={toast.id} toast={toast} isVisible={visibleToastId === toast.id} onClose={handleClose}/>
        </CollectionToastsStyled>,
        container,
    );
};

export default CollectionToasts;
