import { useAppSelector } from "store/hooks.ts";
import { gameSelector } from "store/features/game/selectors.ts";
import { useEffect, useRef } from "react";
import { useAudioManager } from "hooks/useAudioManager.ts";
import { SOUND_PATHS } from "assets/sounds";
import {activePackSelector} from "store/features/game/selectors.ts";
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
import PacksButton from "./components/PacksButton";
import SettingsButton from "./components/SettingsButton";
import InstallPWAButton from "./components/InstallPWAButton";

const MainMenu = () => {
  const game = useAppSelector(gameSelector);
  const pack = useAppSelector(activePackSelector);
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
    <WeatherController ref={refView} min={0} max={3} current={0} src={pack.castle}>
      <MainStyled>
        <Title />
        <MenuStyled>
          <MenuButton
            value={game ? "link.page.continue" : "link.page.new-game"}
            to={game ? "/classic-game" : "/pack-selection"}
            autoFocus={true}
          />
          <ProfilesButton />
          <PacksButton />
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
