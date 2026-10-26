import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDndContext } from "@dnd-kit/core";
import { useAppSelector } from "store/hooks.ts";
import { classicGameSelector } from "store/features/classic-game/selectors.ts";
import GameSettings from "./components/GameSettings";
import {
  ActionButtonStyled,
  HeaderMenuActionsStyled,
  HeaderMenuTitleStyled,
} from "./styles.ts";
import type { HeaderMenuActionsPropsType } from "./types.ts";

const HeaderMenuActions: FC<HeaderMenuActionsPropsType> = ({
  onCloseMenu,
  onHome,
  onSurrender,
}) => {
  const game = useAppSelector(classicGameSelector);
  const { active } = useDndContext();
  const { t } = useTranslation();

  return (
    <>
      <HeaderMenuTitleStyled>{t("ui.menu.title")}</HeaderMenuTitleStyled>
      <HeaderMenuActionsStyled>
        <ActionButtonStyled
          value="link.page.home"
          onClick={onHome}
          showBullet={false}
        />
        <ActionButtonStyled
          value="ui.game.surrender"
          showBullet={false}
          disabled={!game || !!active}
          onClick={() => {
            onCloseMenu();
            onSurrender();
          }}
        />
        <GameSettings />
      </HeaderMenuActionsStyled>
    </>
  );
};

export default HeaderMenuActions;
