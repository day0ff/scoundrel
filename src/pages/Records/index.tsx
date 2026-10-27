import { useState, type FC, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "constants.ts";
import { useAppSelector } from "store/hooks.ts";
import { rankedRecordsSelector } from "store/features/records/selectors.ts";
import type { RecordGameType } from "store/features/records/types.ts";
import { GAME_TYPE_LABELS, GAME_TYPE_PACKS } from "./constants.ts";
import {
  RecordsStyled,
  RecordsScrollStyled,
  RecordsTitleStyled,
  RecordsModeTitleStyled,
  RecordsPanelStyled,
  RecordsHeaderStyled,
  RecordsHeaderButtonStyled,
  TabsStyled,
  TabStyled,
  TableScrollStyled,
  RecordsTableStyled,
  EmptyStyled,
  TabPackBoxStyled,
} from "./styles.ts";

const Records: FC = () => {
  const { t } = useTranslation();
  const groups = useAppSelector(rankedRecordsSelector);
  const [gameType, setGameType] = useState<RecordGameType>("classic");
  const records =
    groups.find((group) => group.gameType === gameType)?.records ?? [];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % groups.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index + groups.length - 1) % groups.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = groups.length - 1;
    else return;
    event.preventDefault();
    const next = groups[nextIndex].gameType;
    setGameType(next);
    document.getElementById(`records-tab-${next}`)?.focus();
  };

  return (
    <RecordsStyled $url={`${BASE_URL}/images/backgrounds/castle.png`}>
      <RecordsHeaderStyled>
        <RecordsHeaderButtonStyled
          value="page.records.back"
          to="/main-menu"
          autoFocus={true}
          data-page-autofocus
          showBullet={false}
        />
      </RecordsHeaderStyled>
      <RecordsTitleStyled>{t("page.records.title")}</RecordsTitleStyled>
      <RecordsScrollStyled>
        <RecordsPanelStyled>
          <RecordsModeTitleStyled>{t(GAME_TYPE_LABELS[gameType])}</RecordsModeTitleStyled>
          <TabsStyled role="tablist" aria-label={t("page.records.gameTypes")}>
            {groups.map((group, index) => (
              <TabStyled
                key={group.gameType}
                type="button"
                role="tab"
                id={`records-tab-${group.gameType}`}
                aria-controls="records-panel"
                aria-selected={gameType === group.gameType}
                tabIndex={gameType === group.gameType ? 0 : -1}
                aria-label={t(GAME_TYPE_PACKS[group.gameType].name)}
                onClick={() => setGameType(group.gameType)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <div inert aria-hidden="true">
                  <TabPackBoxStyled
                    {...GAME_TYPE_PACKS[group.gameType]}
                    id={`records-pack-${group.gameType}`}
                    isSelected={gameType === group.gameType}
                    isSelectable={false}
                    isFlippable={false}
                    $color={
                      GAME_TYPE_PACKS[group.gameType].card.color ?? "black"
                    }
                    $textStroke="black"
                    amount={Math.trunc(
                      GAME_TYPE_PACKS[group.gameType].decks.reduce(
                        (total, deck) => total + deck.cards.length,
                        0,
                      ) / 5,
                    )}
                  />
                </div>
              </TabStyled>
            ))}
          </TabsStyled>
          <section
            id="records-panel"
            role="tabpanel"
            aria-labelledby={`records-tab-${gameType}`}
            tabIndex={0}
          >
            <TableScrollStyled>
              <RecordsTableStyled>
                <thead>
                  <tr>
                    <th scope="col">{t("page.records.rank")}</th>
                    <th scope="col">{t("page.records.playerName")}</th>
                    <th scope="col" aria-sort="descending">
                      {t("page.records.score")}
                    </th>
                    <th scope="col">{t("page.records.time")}</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <th scope="row">
                        {record.playerName || t("page.records.unknownPlayer")}
                      </th>
                      <td>{record.score}</td>
                      <td>
                        <time>{record.time}</time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </RecordsTableStyled>
            </TableScrollStyled>
            {!records.length && (
              <EmptyStyled>{t("page.records.empty")}</EmptyStyled>
            )}
          </section>
        </RecordsPanelStyled>
      </RecordsScrollStyled>
    </RecordsStyled>
  );
};

export default Records;
