import { useLayoutEffect, useRef, useState, type FC } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import { heroClassicGameSelector } from "store/features/classic-game/selectors.ts";
import { clearClassicGame, resetDungeon } from "store/features/classic-game";
import { useSoundEffect } from "hooks/useSoundEffect.ts";
import GameLog from "../GameLog";
import { MODAL_BACKDROP_DURATION_MS } from "components/Modal/constants.ts";
import { GameButtonStyled } from "../../styles.ts";
import { GameResultBackgroundStyled, GameResultModalStyled, GameResultStyled } from "./styles.ts";
import type { GameResultPropsType } from "./types.ts";
import { GAME_RESULT_BACKGROUNDS, GAME_RESULT_SOUNDS, GAME_RESULT_TRANSLATIONS } from "./constants.ts";
import { gameResultScoreSelector } from "./selectors.ts";
import ScoreMeter from "./components/ScoreMeter";

const GameResult: FC<GameResultPropsType> = ({ outcome }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hero = useAppSelector(heroClassicGameSelector);
  const scoring = useAppSelector(gameResultScoreSelector);
  const [soundVariant] = useState(() => Math.floor(Math.random() * 2));
  const [backgroundVariant] = useState(() => Math.floor(Math.random() * 2));
  const [leaving, setLeaving] = useState(false);
  const pendingExitRef = useRef<(() => void) | null>(null);

  useLayoutEffect(
    () => () => {
      // The route transition unmounts this page only after the curtains cover it.
      const completeExit = pendingExitRef.current;
      pendingExitRef.current = null;
      completeExit?.();
    },
    [],
  );

  useSoundEffect(GAME_RESULT_SOUNDS[outcome][soundVariant], 0, true);

  const getTranslationKey = (field: "title" | "description") =>
    GAME_RESULT_TRANSLATIONS[outcome][field];

  const handleNewGame = () => {
    if (pendingExitRef.current) return;
    pendingExitRef.current = () => dispatch(resetDungeon(hero?.identifier));
    setLeaving(true);
    navigate("/dungeon-preview");
  };
  const handleMainMenu = () => {
    if (pendingExitRef.current) return;
    pendingExitRef.current = () => dispatch(clearClassicGame());
    setLeaving(true);
    navigate("/main-menu");
  };

  return (
    <GameResultModalStyled
      isOpen
      isClosable={false}
      animationDuration={MODAL_BACKDROP_DURATION_MS}
    >
      <GameResultBackgroundStyled
        $backgroundImage={GAME_RESULT_BACKGROUNDS[outcome][backgroundVariant]}
      />
      <GameResultStyled
        as="section"
        aria-labelledby="game-result-title"
        data-game-outcome={outcome}
        onKeyDown={(event) => {
          if (
            event.key === "Escape" &&
            (event.target as HTMLElement).closest("dialog") ===
              event.currentTarget.closest("dialog")
          )
            event.preventDefault();
        }}
      >
        <h1 id="game-result-title">{t(getTranslationKey("title"))}</h1>
        <p>{t(getTranslationKey("description"))}</p>
        {scoring && <ScoreMeter {...scoring} />}
        <nav aria-label={t("ui.gameResult.actions")}>
          <GameButtonStyled
            $backgroundColor="#b90000"
            autoFocus
            disabled={leaving}
            onClick={handleNewGame}
          >
            {t("ui.gameResult.newGame")}
          </GameButtonStyled>
          <GameButtonStyled
            $backgroundColor="darkorange"
            disabled={leaving}
            onClick={handleMainMenu}
          >
            {t("link.page.home")}
          </GameButtonStyled>
        </nav>
        <GameLog />
      </GameResultStyled>
    </GameResultModalStyled>
  );
};

export default GameResult;
