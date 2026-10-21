type SvgUrlType = {
    path?: string;
    color?: string;
};

export const getSvgUrl = async ({path, color = "black"}: SvgUrlType) => {
    if (!path) return;

    const svgText = await fetch(path).then(r => r.text());
    const coloredSvg = svgText.replace('fill="currentColor"', `fill="${color}"`);

    const blob = new Blob([coloredSvg], {type: 'image/svg+xml'});

    return URL.createObjectURL(blob);
}