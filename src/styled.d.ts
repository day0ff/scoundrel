import "styled-components";
import type {ThemeType} from "context/Theme/types.ts";

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends ThemeType {}
}
