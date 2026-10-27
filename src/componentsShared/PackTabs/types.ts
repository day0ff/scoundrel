import type {PackDataType, PackIdentifierType} from "entities/packs/types.ts";

export type PackTabsPropsType = {
    packs: PackDataType<string>[];
    selectedIdentifier: PackIdentifierType;
    onSelect: (identifier: PackIdentifierType) => void;
    label: string;
    idPrefix: string;
    panelId?: string;
    size?: "compact" | "full";
};
