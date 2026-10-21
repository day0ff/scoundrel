import {useCallback, useImperativeHandle, useRef, useState, type FC} from "react";
import {createPortal} from "react-dom";
import ToastMessage from "./components/ToastMessage";
import {ToastStyled} from "./styles.ts";
import type {ToastMessageType, ToastPropsType} from "./types.ts";

const Toast: FC<ToastPropsType> = ({ref}) => {
    const [queue, setQueue] = useState<ToastMessageType[]>([]);
    const nextId = useRef(0);
    useImperativeHandle(ref, () => ({
        enqueue: (message) => {
            const item = {id: nextId.current++, message};
            setQueue(previous => [...previous, item]);
        },
    }), []);
    const handleClose = useCallback((id: number) => {
        setQueue(previous => previous.filter(item => item.id !== id));
    }, []);
    const current = queue[0];

    return createPortal(
        <ToastStyled role="status" aria-live="polite" aria-atomic="true">
            {current && <ToastMessage key={current.id} message={current.message} onClose={() => handleClose(current.id)}/>}
        </ToastStyled>,
        document.body,
    );
};

export default Toast;
