import {FC, useCallback, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import Decks from "componentsShared/Decks";
import ModalStack from "componentsShared/ModalStack";
import MenuButton from "../MenuButton";
import {DecksButtonPropsType} from "./types.ts";

const DecksButton: FC<DecksButtonPropsType> = ({...props}) => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const getTooltipContainer = useCallback(() => dialogRef.current ?? document.body, []);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <>
            <ModalStack ref={dialogRef} isOpen={isModalOpen} initialNode={<Decks appendTo={getTooltipContainer}/>} onClose={handleCloseModal} />
            <MenuButton value={t`button.decks.text`} {...props} onClick={handleOpenModal}/>
        </>
    );
}

export default DecksButton;
