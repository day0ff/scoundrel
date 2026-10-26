import { useAppSelector } from "store/hooks.ts";
import { classicGameSelector } from "store/features/classic-game/selectors.ts";
import { useEffect, useRef } from "react";
import { useAudioManager } from "hooks/useAudioManager.ts";
import { SOUND_PATHS } from "assets/sounds";
import { BASE_URL } from "constants.ts";
import Logo from "components/Logo";
import WeatherController from "componentsShared/WeatherController";

import MenuButton from "./components/MenuButton";
import ProfilesButton from "./components/ProfilesButton";
import Title from "./components/Title";
import {
  FooterStyled,
  MainStyled,
  MenuStyled,
  VersionStyled,
} from "./styles.ts";
import DecksButton from "./components/DecksButton";
import SettingsButton from "./components/SettingsButton";
import InstallPWAButton from "./components/InstallPWAButton";

const src = `${BASE_URL}/images/backgrounds/castle.png`;

const MainMenu = () => {
  const game = useAppSelector(classicGameSelector);
  const refView = useRef<HTMLDivElement>(null);
  const audio = useAudioManager();

  useEffect(() => {
    void audio
      .preload([SOUND_PATHS.PieceImpact1, SOUND_PATHS.PieceImpact2])
      .catch((error: unknown) => {
        console.warn("Unable to preload menu sounds", error);
      });
  }, [audio]);

  return (
    <WeatherController ref={refView} min={0} max={3} current={0} src={src}>
      <MainStyled>
        <Title />
        <MenuStyled>
          <MenuButton
            value={game ? "link.page.continue" : "link.page.new-game"}
            to={game ? "/classic-game" : "/dungeon-preview"}
            autoFocus={true}
          />
          <ProfilesButton />
          <DecksButton />
          <MenuButton value="page.records.title" to="/records" />
          <SettingsButton />
          <InstallPWAButton />
        </MenuStyled>
      </MainStyled>
      <FooterStyled>
        <Logo />
        <VersionStyled />
      </FooterStyled>
    </WeatherController>
  );
};

export default MainMenu;
