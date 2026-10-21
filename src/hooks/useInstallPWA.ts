import {useSyncExternalStore} from "react";
import {canInstallPWA, promptInstallPWA, subscribeToPWAInstall} from "utils/pwaInstall.ts";

type UseInstallPWAResult = {
    showInstallPrompt: boolean;
    promptInstall: () => Promise<void>;
};

export const useInstallPWA = (): UseInstallPWAResult => ({
    showInstallPrompt: useSyncExternalStore(subscribeToPWAInstall, canInstallPWA),
    promptInstall: promptInstallPWA,
});
