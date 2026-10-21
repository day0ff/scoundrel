import {FC} from "react";
import {PageContainerStyled} from "styles";
import {
    WeatherControllerStyled,
    FrontStyled,
} from "./styles.ts";
import {WeatherControllerPropsType} from "./types.ts";

const WeatherController: FC<WeatherControllerPropsType> = ({ref, src, min, max, current, children}) => {
    const chunks = max - min + 1;
    const index = current + chunks - 1;

    return (
        <WeatherControllerStyled>
            <FrontStyled $url={src} $parts={chunks} $index={index}/>
            <PageContainerStyled ref={ref}>
                {children}
            </PageContainerStyled>
        </WeatherControllerStyled>
    );
}

export default WeatherController;