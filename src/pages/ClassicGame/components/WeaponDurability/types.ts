import type {TippyProps} from "components/Tooltip/types.ts";

export type WeaponDurabilityPropsType = Pick<TippyProps, "appendTo" | "disabled"> & {
    durability: number;
};
