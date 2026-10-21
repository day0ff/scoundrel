import {createTransform} from "redux-persist";

// Partial persist for "profiles" slice

export const profilesTransform = createTransform(
    // save only these parts
    (inboundState: any) => ({
        ...inboundState
    }),
    // restore with defaults for missing parts
    (outboundState: any) => ({
        ...outboundState,
    }),
    {whitelist: ['profiles']}
);