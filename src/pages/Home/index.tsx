import {useCallback, useEffect, useRef, useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import Logo from "components/Logo";

import {FooterStyled, HomeStyled, TitleStyled, VersionStyled, DayoffLogoStyled} from "./styles.ts";

const Home: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const startedRef = useRef(false);
    const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [started, setStarted] = useState(false);

    const openMainMenu = useCallback(() => {
        if (navigationTimerRef.current !== null) {
            clearTimeout(navigationTimerRef.current);
            navigationTimerRef.current = null;
        }
        navigate("/main-menu", {replace: true});
    }, [navigate]);

    const handleIntroEnded = useCallback(() => {
        if (navigationTimerRef.current !== null) return;
        navigationTimerRef.current = setTimeout(openMainMenu, 2000);
    }, [openMainMenu]);

    useEffect(() => {
        const handleInteraction = (event: KeyboardEvent | MouseEvent) => {
            if (event instanceof KeyboardEvent && event.repeat) return;
            if (event.target instanceof Element && event.target.closest("label, input, a")) return;
            event.preventDefault();
            if (startedRef.current) {
                openMainMenu();
                return;
            }

            startedRef.current = true;
            setStarted(true);
        };

        window.addEventListener("keydown", handleInteraction);
        window.addEventListener("click", handleInteraction);
        return () => {
            window.removeEventListener("keydown", handleInteraction);
            window.removeEventListener("click", handleInteraction);
            if (navigationTimerRef.current !== null) {
                clearTimeout(navigationTimerRef.current);
                navigationTimerRef.current = null;
            }
        };
    }, [openMainMenu]);

    return (
        <HomeStyled>
            {!started && <TitleStyled>{t("page.home.press-any-key")}</TitleStyled>}
            {!started && (
                <FooterStyled>
                    <Logo/>
                    <VersionStyled/>
                </FooterStyled>
            )}
            {started && (
                <DayoffLogoStyled
                    onEnded={handleIntroEnded}
                    onError={openMainMenu}
                />
            )}
        </HomeStyled>
    );
};

export default Home;
