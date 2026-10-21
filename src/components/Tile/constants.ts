import type {TileVariant} from "./types.ts";

export const TILE_MAP = {
    tile: `${import.meta.env.BASE_URL}images/interface/tiles/tile.png`,
    stone: `${import.meta.env.BASE_URL}images/interface/tiles/stone.png`,
} as const satisfies Record<TileVariant, string>;
