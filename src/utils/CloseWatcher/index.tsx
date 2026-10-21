import {useEffect} from "react";
import {useAppDispatch} from "store/hooks.ts";
import {syncProfileAction} from "store/actions";

const CloseWatcher = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleUnload = () => {
            dispatch(syncProfileAction());
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [dispatch]);

    return null;
};

export default CloseWatcher;