import {useState, type FC, type KeyboardEvent} from "react";
import {useTranslation} from "react-i18next";
import {BASE_URL} from "constants.ts";
import {useAppSelector} from "store/hooks.ts";
import {rankedRecordsSelector} from "store/features/records/selectors.ts";
import type {RecordGameType} from "store/features/records/types.ts";
import {GAME_TYPE_LABELS} from "./constants.ts";
import {RecordsStyled, RecordsScrollStyled, RecordsTitleStyled, RecordsPanelStyled, RecordsButtonStyled, TabsStyled, TabStyled, TableScrollStyled, RecordsTableStyled, EmptyStyled} from "./styles.ts";

const Records: FC = () => {
    const {t} = useTranslation();
    const groups = useAppSelector(rankedRecordsSelector);
    const [gameType, setGameType] = useState<RecordGameType>("classic");
    const records = groups.find(group => group.gameType === gameType)?.records ?? [];

    const handleTabKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        let nextIndex: number;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % groups.length;
        else if (event.key === "ArrowLeft") nextIndex = (index + groups.length - 1) % groups.length;
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
            <RecordsScrollStyled>
                <RecordsTitleStyled>{t("page.records.title")}</RecordsTitleStyled>
                <RecordsPanelStyled>
                    <TabsStyled role="tablist" aria-label={t("page.records.gameTypes")}>
                        {groups.map((group, index) => (
                            <TabStyled key={group.gameType} type="button" role="tab"
                                id={`records-tab-${group.gameType}`} aria-controls="records-panel"
                                aria-selected={gameType === group.gameType} tabIndex={gameType === group.gameType ? 0 : -1}
                                value={GAME_TYPE_LABELS[group.gameType]} showBullet={false}
                                onClick={() => setGameType(group.gameType)} onKeyDown={event => handleTabKeyDown(event, index)}/>
                        ))}
                        <TabStyled type="button" role="tab" disabled aria-selected={false}
                            value="page.records.comingSoon" showBullet={false}/>
                    </TabsStyled>
                    <section id="records-panel" role="tabpanel" aria-labelledby={`records-tab-${gameType}`} tabIndex={0}>
                        <TableScrollStyled>
                            <RecordsTableStyled>
                                <caption>{t("page.records.rankingOrder")}</caption>
                                <thead><tr>
                                    <th scope="col">{t("page.records.rank")}</th>
                                    <th scope="col">{t("page.records.playerName")}</th>
                                    <th scope="col" aria-sort="descending">{t("page.records.score")}</th>
                                    <th scope="col">{t("page.records.time")}</th>
                                </tr></thead>
                                <tbody>{records.map((record, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <th scope="row">{record.playerName || t("page.records.unknownPlayer")}</th>
                                        <td>{record.score}</td>
                                        <td><time>{record.time}</time></td>
                                    </tr>
                                ))}</tbody>
                            </RecordsTableStyled>
                        </TableScrollStyled>
                        {!records.length && <EmptyStyled>{t("page.records.empty")}</EmptyStyled>}
                    </section>
                    <RecordsButtonStyled value="page.records.back" to="/main-menu" autoFocus={true} data-page-autofocus showBullet={false}/>
                </RecordsPanelStyled>
            </RecordsScrollStyled>
        </RecordsStyled>
    );
};

export default Records;
