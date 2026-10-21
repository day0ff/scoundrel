import {createTransform} from "redux-persist";

const serializeNumber = (value: number): number | string => {
    if (value === Infinity) return "__INFINITY__";
    if (value === -Infinity) return "__NEG_INFINITY__";
    if (Number.isNaN(value)) return "__NAN__";
    return value;
}

const deserializeNumber = (value: number | string): number => {
    if (value === "__INFINITY__") return Infinity;
    if (value === "__NEG_INFINITY__") return -Infinity;
    if (value === "__NAN__") return NaN;
    return value as number;
}


export const serializeTransform = createTransform(
    // Called when saving to storage
    (inboundState: any) => {
        return JSON.parse(
            JSON.stringify(inboundState, (_, value) => serializeNumber(value))
        );
    },
    // Called when loading from storage
    (outboundState: any) => {
        return JSON.parse(
            JSON.stringify(outboundState),
            (_, value) => deserializeNumber(value)
        );
    }
);
