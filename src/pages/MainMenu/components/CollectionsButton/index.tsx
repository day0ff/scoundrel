import {FC, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import Collections from "componentsShared/Collections";
import ModalStack from "componentsShared/ModalStack";
import MenuButton from "../MenuButton";
import {CollectionsButtonPropsType} from "./types.ts";

const CollectionsButton: FC<CollectionsButtonPropsType> = ({...props}) => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <>
            <ModalStack isOpen={isModalOpen} initialNode={<Collections />} onClose={handleCloseModal} />
            <MenuButton value={t`button.collections.text`} {...props} onClick={handleOpenModal}/>
        </>
    );
}

export default CollectionsButton;