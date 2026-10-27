import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import PackTabs from "componentsShared/PackTabs";
import {allPacks} from "entities/packs/constants.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";
import {activePackSelector} from "store/features/game/selectors.ts";
import { useAppSelector } from "store/hooks.ts";
import { rankedRecordsSelector } from "store/features/records/selectors.ts";
import type { RecordGameType } from "store/features/records/types.ts";
import { GAME_TYPE_LABELS } from "./constants.ts";
import {
  RecordsStyled,
  RecordsScrollStyled,
  RecordsTitleStyled,
  RecordsModeTitleStyled,
  RecordsPanelStyled,
  RecordsHeaderStyled,
  RecordsHeaderButtonStyled,
  TableScrollStyled,
  RecordsTableStyled,
  EmptyStyled,
} from "./styles.ts";

const Records: FC = () => {
  const { t } = useTranslation();
  const groups = useAppSelector(rankedRecordsSelector);
  const activePack = useAppSelector(activePackSelector);
  const gameType: RecordGameType = "classic";
  const [packIdentifier, setPackIdentifier] = useState<PackIdentifierType>(activePack.identifier);
  const records = groups.find(group => group.gameType === gameType && group.packIdentifier === packIdentifier)?.records ?? [];

  return (
    <RecordsStyled $url={activePack.castle}>
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
          <PackTabs packs={allPacks} selectedIdentifier={packIdentifier} onSelect={setPackIdentifier}
            label={t("modal.packs.title")} idPrefix="records-pack" panelId="records-panel"/>
          <section
            id="records-panel"
            role="tabpanel"
            aria-labelledby={`records-pack-${packIdentifier}`}
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
