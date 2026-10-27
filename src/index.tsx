import {BrowserRouter, Route} from "react-router";

import {BASE_URL} from "constants.ts";
import ThemeProvider from "context/Theme/provider";
import i18n from 'localization/i18n.config';

import "./reset.css";
import "./normalize.css";
import "./index.css";

import Home from "pages/Home";
import MainMenu from "pages/MainMenu";
import PackSelection from "pages/PackSelection";
import DungeonPreview from "pages/DungeonPreview";
import ClassicGame from "pages/ClassicGame";
import Records from "pages/Records";
import NotFoundPage from "./pages/NotFound";

import ModalDialog from "./components/ModalDialog";
import PageTransitionRoutes from "components/PageTransitionRoutes";
import {AppContainerStyled} from "./styles";
import {HealingEffectsLayerStyled} from "pages/ClassicGame/components/EffectAnimations/components/HealFeedback/styles.ts";

i18n.t("");

function Index() {
    return (
        <ThemeProvider>
            <AppContainerStyled>
                <BrowserRouter basename={BASE_URL}>
                    <PageTransitionRoutes>
                        <Route index element={<Home/>}/>
                        <Route path={"/main-menu"} element={<MainMenu/>}/>
                        <Route path={"/pack-selection"} element={<PackSelection/>}/>
                        <Route path={"/dungeon-preview"} element={<DungeonPreview/>}/>
                        <Route path={"/classic-game"} element={<ClassicGame/>}/>
                        <Route path={"/records"} element={<Records/>}/>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                    </PageTransitionRoutes>
                </BrowserRouter>
                <HealingEffectsLayerStyled id="healing-effects" />
                <ModalDialog />
            </AppContainerStyled>
        </ThemeProvider>
    )
}

export default Index
