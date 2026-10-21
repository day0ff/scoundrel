import {FC, memo} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {hideDialogModal} from "store/features/dialog";
import {dialogSelector} from "store/features/dialog/selectors.ts";
import Modal from "components/Modal";
import {
    ModalBackButtonStyled,
    ModalButtonsContainerStyled,
    ModalContentStyled,
    ModalEnterButtonStyled
} from "./styles.ts";
import {ModalDialogPropsType} from "./types.ts";

const ModalDialog: FC<ModalDialogPropsType> = () => {
    const {t} = useTranslation();
    const { isOpen, content, onAccept, onReject } = useAppSelector(dialogSelector);
    const dispatch = useAppDispatch();

    const handleAccept = () => {
        onAccept?.();

        dispatch(hideDialogModal());
    };

    const handleReject = () => {
        onReject?.();

        dispatch(hideDialogModal());
    };

    return (
        <Modal isOpen={isOpen} onClose={handleReject}>
            <ModalContentStyled>
                {content}
                <ModalButtonsContainerStyled>
                    <ModalEnterButtonStyled onClick={handleAccept}>
                        {t`button.accept.text`}
                    </ModalEnterButtonStyled>
                    <ModalBackButtonStyled onClick={handleReject}>
                        {t`button.cancel.text`}
                    </ModalBackButtonStyled>
                </ModalButtonsContainerStyled>
            </ModalContentStyled>
        </Modal>
    );
}

export default memo(ModalDialog);