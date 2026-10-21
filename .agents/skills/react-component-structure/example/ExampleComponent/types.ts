import {COLLECTION_TITLE_TRANSLATIONS} from "./constants.ts";

export type ExampleComponentPropsType = {
    collection: keyof typeof COLLECTION_TITLE_TRANSLATIONS;
};
