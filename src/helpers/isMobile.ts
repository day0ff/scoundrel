export const isMobile = (): boolean => {
    // @ts-ignore
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    return /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(ua);
}