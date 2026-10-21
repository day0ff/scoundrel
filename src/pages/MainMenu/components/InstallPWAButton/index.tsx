import type {FC} from "react";
import {useInstallPWA} from "hooks/useInstallPWA.ts";
import MenuButton from "../MenuButton";

const InstallPWAButton: FC = () => {
    const {showInstallPrompt, promptInstall} = useInstallPWA();

    if (!showInstallPrompt) return null;

    return <MenuButton value="ui.pwa.install" onClick={promptInstall}/>;
};

export default InstallPWAButton;
