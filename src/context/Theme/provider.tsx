import {useCallback, useMemo, useState} from "react";
import {ThemeProvider} from "styled-components";

import {light, dark} from "./colorScheme";
import {ThemeContext} from "./context";

import type {FC, PropsWithChildren} from "react";
import {ThemeType} from "./types.ts";
import {useDevice} from "./useDevice";
import {media} from "./constants.ts";

const getTheme = () => {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return {...(isDarkTheme ? dark : light), media} as ThemeType
};

const ThemeProviderComponent: FC<PropsWithChildren> = ({children}) => {
    const device = useDevice();

    const [theme, setTheme] = useState<ThemeType>(getTheme());

    const toggleTheme = useCallback(() => {
        setTheme(previousTheme => ({...(previousTheme?.colorScheme === 'dark' ? light : dark), media}) as ThemeType)
    }, []);

    const themeWithDevice: ThemeType = useMemo(() => ({...theme, device}), [theme, device]);

    const value = useMemo(() => ({
        theme: themeWithDevice,
        toggleTheme
    }), [themeWithDevice, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {/* @ts-ignore */}
            <ThemeProvider theme={themeWithDevice}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProviderComponent;
