import { BASE_URL } from "constants.ts";
import { useTranslation } from "react-i18next";

import { MenuButtonStyled, NotFoundPageStyled, NotFoundTextStyled } from "./styles.ts";

const src = `${BASE_URL}/images/backgrounds/dead-end.png`;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFoundPageStyled $url={src}>
      <NotFoundTextStyled>{t`page.not-found.title`}</NotFoundTextStyled>
      <MenuButtonStyled value="page.not-found.back-home" to="/main-menu" autoFocus/>
    </NotFoundPageStyled>
  );
};

export default NotFound;
