import type {GAME_MODES} from "entities/game-modes/constants.ts";
import type {GameModeType} from "entities/game-modes/types.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";

export type RecordGameType = typeof GAME_MODES[GameModeType]["recordGameType"];

export type WinningRecordType = {
    playerName: string;
    score: number;
    time: string;
};

export type GameRecordsType = {
    gameType: RecordGameType;
    packIdentifier: PackIdentifierType;
    records: WinningRecordType[];
};

export type RecordsStateType = GameRecordsType[];
