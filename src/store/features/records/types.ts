export type RecordGameType = "classic-game";

export type WinningRecordType = {
    playerName: string;
    score: number;
    time: string;
};

export type GameRecordsType = {
    gameType: RecordGameType;
    records: WinningRecordType[];
};

export type RecordsStateType = GameRecordsType[];
