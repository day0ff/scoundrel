import type {FC} from "react";
import {TILE_MAP} from "./constants.ts";
import {TileStyled} from "./styles.ts";
import type {TilePropsType} from "./types.ts";

export type {TilePropsType, TileVariant} from "./types.ts";

const Tile: FC<TilePropsType> = ({variant = "tile", indent = 0, cornerRadius = 0, children, ...props}) => (
    <TileStyled {...props} $imageUrl={TILE_MAP[variant]} $indent={indent} $cornerRadius={cornerRadius}>
        {children}
    </TileStyled>
);

export default Tile;
