import {useCallback, useState, type FC} from "react";
import ModalStack from "componentsShared/ModalStack";
import MenuButton from "../MenuButton";
import Settings from "./components/Settings";
import type {SettingsButtonPropsType} from "./types.ts";

const SettingsButton: FC<SettingsButtonPropsType> = ({...props}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
    const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

    return (
        <>
            <ModalStack isOpen={isModalOpen} initialNode={<Settings/>} onClose={handleCloseModal}/>
            <MenuButton value={"page.settings.title"} {...props} onClick={handleOpenModal}/>
        </>
    );
};

export default SettingsButton;
