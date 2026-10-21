export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = !IS_DEV;
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "0.1.0";
export const BASE_URL = import.meta.env.VITE_BASE_URL || "";
export const NOT_PERSIST = import.meta.env.VITE_NOT_PERSIST !== "false";

export const  POSTHOG_KEY= import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
export const  POSTHOG_HOST= import.meta.env.VITE_PUBLIC_POSTHOG_HOST;