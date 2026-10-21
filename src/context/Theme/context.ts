import {createContext} from 'react';

import {light} from "./colorScheme";

import {ThemeType} from "./types";
import {media} from "./constants.ts";

export type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
}

const theme = {...light, media, colorScheme: "light"} satisfies ThemeType;

export const ThemeContext = createContext<ThemeContextType>({
    theme,
    toggleTheme: () => null,
});
