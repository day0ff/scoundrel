export const isPWAInstalled = (): boolean => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIos = (window.navigator as any).standalone === true;
    return isStandalone || isIos;
};