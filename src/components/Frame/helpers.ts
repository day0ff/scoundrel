import type {FrameConfig, FramePiece, FrameRegion} from "./types.ts";

export const getFrameRegions = ({
    width, height, cornerWidth, cornerHeight, borderWidth, borderHeight,
}: FrameConfig): Record<FramePiece, FrameRegion> => ({
    topLeft: {x: 0, y: 0, width: cornerWidth, height: cornerHeight},
    top: {x: cornerWidth, y: 0, width: width - 2 * cornerWidth, height: borderHeight},
    topRight: {x: width - cornerWidth, y: 0, width: cornerWidth, height: cornerHeight},
    left: {x: 0, y: cornerHeight, width: borderWidth, height: height - 2 * cornerHeight},
    right: {x: width - borderWidth, y: cornerHeight, width: borderWidth, height: height - 2 * cornerHeight},
    bottomLeft: {x: 0, y: height - cornerHeight, width: cornerWidth, height: cornerHeight},
    bottom: {x: cornerWidth, y: height - borderHeight, width: width - 2 * cornerWidth, height: borderHeight},
    bottomRight: {x: width - cornerWidth, y: height - cornerHeight, width: cornerWidth, height: cornerHeight},
});
