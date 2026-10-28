import type {RootState} from "store/types.ts";

export const currentCollectionToastSelector = (state: RootState) => state.collectionToasts[0];
