import {useCallback, useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "store/hooks.ts";
import {currentProfileNameSelector, currentProfileSelector} from "store/features/profiles/selectors.ts";
import ModalStack from "componentsShared/ModalStack";
import Profiles from "componentsShared/Profiles";
import MenuButton from "../MenuButton";
import type {ProfilesButtonPropsType} from "./types.ts";

const ProfilesButton: FC<ProfilesButtonPropsType> = ({...props}) => {
    const {t} = useTranslation();
    const name = useAppSelector(currentProfileNameSelector);
    const hasProfile = Boolean(useAppSelector(currentProfileSelector));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <>
            <ModalStack
                isOpen={isModalOpen || !hasProfile}
                isClosable={hasProfile}
                initialNode={<Profiles/>}
                onClose={handleCloseModal}
            />
            <MenuButton value={t(`button.profile.text`, {name})} {...props} onClick={handleOpenModal}/>
        </>

    );
};

export default ProfilesButton;
