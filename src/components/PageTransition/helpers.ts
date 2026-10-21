import type {CardSideType} from "entities/cards/types.ts";
import {CARD_PRELOAD_TIMEOUT_MS} from "./constants.ts";

export const preloadCardImages = (sides: readonly CardSideType[], signal: AbortSignal): Promise<void> => {
    const sources = [...new Set(sides.flatMap(({base, image, overlay}) =>
        [base, image, overlay].filter((source): source is string => Boolean(source)),
    ))];

    return Promise.all(sources.map((source) => new Promise<void>((resolve) => {
        if (signal.aborted) {
            resolve();
            return;
        }

        const image = new Image();
        const finish = () => {
            clearTimeout(timeout);
            image.onload = null;
            image.onerror = null;
            signal.removeEventListener("abort", finish);
            resolve();
        };
        const timeout = setTimeout(finish, CARD_PRELOAD_TIMEOUT_MS);
        image.onload = finish;
        image.onerror = finish;
        signal.addEventListener("abort", finish, {once: true});
        image.src = source;
    }))).then(() => undefined);
};
