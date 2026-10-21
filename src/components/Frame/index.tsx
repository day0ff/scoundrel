import {useId, type FC} from "react";
import {getFrameRegions} from "./helpers.ts";
import {FrameArtworkStyled, FramePieceStyled, FrameStyled} from "./styles.ts";
import type {FramePropsType} from "./types.ts";

export type {FramePropsType, FrameConfig, FrameRegion, FramePiece} from "./types.ts";

const Frame: FC<FramePropsType> = ({
    spriteUrl, config, children, ...props
}) => {
    const id = useId();
    const {cornerWidth, cornerHeight, borderWidth, borderHeight} = config;
    const regions = getFrameRegions(config);

    return (
        <FrameStyled {...props} $cornerWidth={cornerWidth} $cornerHeight={cornerHeight}>
            <FrameArtworkStyled $cornerWidth={cornerWidth} $cornerHeight={cornerHeight} aria-hidden="true">
                {Object.entries(regions).map(([piece, region]) => {
                    const patternId = `${id}-${piece}`;

                    return (
                        <FramePieceStyled key={piece} $piece={piece} $borderWidth={borderWidth} $borderHeight={borderHeight} focusable="false">
                            <defs>
                                {/* A pattern clips the image before repeating it. No viewBox means
                                    one SVG unit remains one CSS pixel at every container size. */}
                                <pattern id={patternId} width={region.width} height={region.height}
                                    patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                                    <image href={spriteUrl} x={-region.x} y={-region.y}
                                        width={config.width} height={config.height}/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#${patternId})`}/>
                        </FramePieceStyled>
                    );
                })}
            </FrameArtworkStyled>
            {children}
        </FrameStyled>
    );
};

export default Frame;
