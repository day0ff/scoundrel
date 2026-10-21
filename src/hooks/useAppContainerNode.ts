import {useState, useLayoutEffect} from "react";
import {AppContainerStyled} from "../styles";

export const useAppContainerNode = (): HTMLElement => {
    const [container, setContainer] = useState<HTMLElement>();

    useLayoutEffect(() => {
        setContainer(document.querySelector(AppContainerStyled.toString()) as HTMLElement);
    }, [])

    return container as HTMLElement;
}
