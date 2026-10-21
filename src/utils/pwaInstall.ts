import type {BeforeInstallPromptEvent} from "../global";
import {isPWAInstalled} from "helpers/isPWAInstalled.ts";

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let isInstalled = isPWAInstalled();
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    notify();
});

window.addEventListener("appinstalled", () => {
    isInstalled = true;
    deferredPrompt = null;
    notify();
});

export const subscribeToPWAInstall = (listener: () => void) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

export const canInstallPWA = () => !isInstalled && deferredPrompt !== null;

export const promptInstallPWA = async (): Promise<void> => {
    const prompt = deferredPrompt;
    if (!prompt) return;

    // Each browser prompt can only be used once.
    deferredPrompt = null;
    notify();

    try {
        await prompt.prompt();
        const result = await prompt.userChoice;
        if (result.outcome === "accepted") {
            isInstalled = true;
        }
    } catch (error: unknown) {
        console.warn("Unable to show the installation prompt", error);
    } finally {
        notify();
    }
};
