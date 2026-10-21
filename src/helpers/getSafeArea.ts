export const getSafeArea = () => {
    const top = getComputedStyle(document.documentElement).getPropertyValue("--sat");
    const left = getComputedStyle(document.documentElement).getPropertyValue("--sal");
    const right = getComputedStyle(document.documentElement).getPropertyValue("--sar");
    const bottom = getComputedStyle(document.documentElement).getPropertyValue("--sab");

    return {
        top,
        left,
        right,
        bottom,
    }
}