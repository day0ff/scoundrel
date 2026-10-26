import {useMemo, useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "store/hooks.ts";
import {gameSelector} from "store/features/game/selectors.ts";
import {doesReplayMatchGame, replayGameLog} from "store/features/game/replay.ts";
import {stringifyGameLog} from "store/features/game/log.ts";
import {GameButtonStyled} from "../../../../styles.ts";
import {ACTION_LABELS, ZONE_LABELS} from "./constants.ts";
import {LogViewerStyled} from "./styles.ts";
import type {LogViewerPropsType} from "./types.ts";

const LogViewer: FC<LogViewerPropsType> = () => {
    const {t} = useTranslation();
    const game = useAppSelector(gameSelector);
    const log = game?.log;
    const [position, setPosition] = useState(log?.entries.length ?? 0);
    const replay = useMemo(() => {
        if (!log || !game) return undefined;
        try {
            return {state: replayGameLog(log, Math.min(position, log.entries.length)), matches: doesReplayMatchGame(log, game)};
        } catch {
            return undefined;
        }
    }, [log, position, game]);
    const handleDownload = () => {
        if (!log) return;
        const url = URL.createObjectURL(new Blob([stringifyGameLog(log)], {type: "application/json"}));
        const link = document.createElement("a");
        link.href = url;
        link.download = `game-log-${log.initialState.seed.hash}.json`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 0);
    };

    if (!log) return null;

    return (
        <LogViewerStyled aria-labelledby="game-log-title">
            <header>
                <h2 id="game-log-title">{t("ui.gameLog.title")}</h2>
                <GameButtonStyled onClick={handleDownload}>{t("ui.gameLog.download")}</GameButtonStyled>
            </header>
            <p>{t(log.origin === "newGame" ? "ui.gameLog.newGame" : "ui.gameLog.restoredGame")}</p>
            <p>{t("ui.gameLog.seed", {seed: log.initialState.seed.hash, step: log.initialState.seed.step})}</p>
            <p role="status">{t(!replay ? "ui.gameLog.replayError" : replay.matches ? "ui.gameLog.matches" : "ui.gameLog.mismatch")}</p>
            <label>
                {t("ui.gameLog.position", {number: position, total: log.entries.length})}
                <input type="range" min={0} max={log.entries.length} value={position} onChange={event => setPosition(Number(event.target.value))} />
            </label>
            {replay && (
                <>
                    <p>{t("ui.gameLog.health", {health: replay.state.hero.health.current, turn: replay.state.turnNumber})}</p>
                    <table>
                        <thead><tr><th>{t("ui.gameLog.zone")}</th><th>{t("ui.gameLog.cards")}</th></tr></thead>
                        <tbody>{Object.values(replay.state.zones).map(zone => (
                            <tr key={zone.type}><td>{t(ZONE_LABELS[zone.type])}</td><td>{zone.cards.length}</td></tr>
                        ))}</tbody>
                    </table>
                    <details><summary>{t("ui.gameLog.replayState")}</summary><pre>{stringifyGameLog(replay.state)}</pre></details>
                </>
            )}
            <details><summary>{t("ui.gameLog.initialState")}</summary><pre>{stringifyGameLog(log.initialState)}</pre></details>
            <ol>{log.entries.map(entry => (
                <li key={entry.number}>
                    <GameButtonStyled onClick={() => setPosition(entry.number)}>
                        {t(ACTION_LABELS[entry.action.type])}
                        {" · "}{t("ui.turn.label", {number: entry.turnNumber})}
                    </GameButtonStyled>
                    <details><summary>{t("ui.gameLog.moveDetails")}</summary><pre>{stringifyGameLog(entry)}</pre></details>
                </li>
            ))}</ol>
        </LogViewerStyled>
    );
};

export default LogViewer;
