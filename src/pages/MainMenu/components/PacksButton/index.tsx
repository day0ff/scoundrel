import {FC, useCallback, useRef, useState} from "react";
import Packs from "componentsShared/Packs";
import ModalStack from "componentsShared/ModalStack";
import MenuButton from "../MenuButton";
import {PacksButtonPropsType} from "./types.ts";

const PacksButton: FC<PacksButtonPropsType> = ({...props}) => {
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
            <ModalStack ref={dialogRef} isOpen={isModalOpen} initialNode={<Packs appendTo={getTooltipContainer}/>} onClose={handleCloseModal} />
            <MenuButton value="button.packs.text" {...props} onClick={handleOpenModal}/>
        </>
    );
}

export default PacksButton;
