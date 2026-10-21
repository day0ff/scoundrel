import {FC} from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import {IS_DEV, POSTHOG_KEY, POSTHOG_HOST} from "constants.ts";
import {PostHogAppProviderPropsType} from "./types.ts";

let isPostHogInitialized = false;

const PostHogAppProvider: FC<PostHogAppProviderPropsType> = ({ children }) => {
    const isClient = typeof window !== 'undefined';
    const shouldInitPostHog = isClient && POSTHOG_KEY && !IS_DEV;

    if (shouldInitPostHog && !isPostHogInitialized) {
        posthog.init(POSTHOG_KEY!, {
            api_host: POSTHOG_HOST,
            capture_pageview: true,
            autocapture: true,
        });
        isPostHogInitialized = true;
    }

    return shouldInitPostHog ? (
        <PostHogProvider client={posthog}>{children}</PostHogProvider>
    ) : (
        <>{children}</>
    );
};

export default PostHogAppProvider;