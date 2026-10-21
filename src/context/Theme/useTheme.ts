import {useContext} from "react";
import {ThemeContext} from "./context.ts";

export const useTheme = () => {
    return useContext(ThemeContext);
}