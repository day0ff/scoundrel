import type {GameModeType} from "entities/game-modes/types.ts";
import type {PackIdentifierType} from "entities/packs/types.ts";
import {InitDeckDataType} from "entities/decks/types.ts";
import {InitHeroDataType} from "entities/heroes/types.ts";
import {InitPasteboardDataType} from "entities/pasteboards/types.ts";
import {RankType} from "entities/types.ts";
import type {PseudoRandomResult} from "helpers";

export type SeedType = PseudoRandomResult;
import type {PhaseDataType, PhaseLifecycleType} from "entities/phases/types.ts";
import type {EffectAnimationEventType} from "entities/animations/types.ts";

export type PlayingCardType = InitPasteboardDataType<string, RankType>;
export type ZoneKindType = "dungeon" | "discard" | "room" | "weapons" | "potions" | "crypt";

export type ZoneType = {
    type: ZoneKindType;
    cards: Array<PlayingCardType>;
    capacity: number;
};

export type RoomZoneType = ZoneType & {
    minimumCardsToPlay: number;
};

export type PotionsZoneType = ZoneType & {
    maximumPotionsPerRoom: number;
};

export type GameOutcomeType = "victory" | "defeat";

export type GameStateType = {
    mode: GameModeType;
    packIdentifier: PackIdentifierType;
    time: string;
    scoreRange?: {min: number; max: number};
    lastPlayedCard?: Pick<PlayingCardType, "role" | "rank">;
    log?: GameLogType;
    outcome?: GameOutcomeType;
    seed: SeedType;
    started?: boolean;
    completedRooms?: PlayingCardType[][];
    activeRoomCards?: PlayingCardType[];
    hero: InitHeroDataType<string>;
    selectedCardId?: string;
    phaseLifecycle: PhaseLifecycleType;
    currentPhase: PhaseDataType<string>["identifier"];
    turnNumber: number;
    animationEvents: EffectAnimationEventType[];
    animationSequence: number;
    zones: Record<ZoneKindType, ZoneType> & {room: RoomZoneType; potions: PotionsZoneType};
    roomProgress?: {fightStarted: boolean; cardsPlayed: number; skipAllowed: boolean; potionsPlayed?: number; potionPlayed?: boolean};
};

export type PreAnimationGameStateType = Omit<GameStateType, "animationEvents" | "animationSequence">;
export type PreLifecycleGameStateType = Omit<PreAnimationGameStateType, "phaseLifecycle" | "currentPhase" | "turnNumber">;
export type HeroLessGameStateType = Omit<PreLifecycleGameStateType, "hero">;

export type HandGameStateType = {
    seed: SeedType;
    zones: Record<"dungeon" | "discard" | "room" | "hand", Omit<ZoneType, "type"> & {type: "dungeon" | "discard" | "room" | "hand"}>;
};

type WithOldZoneNames<State extends {zones: object}> = State extends unknown
    ? Omit<State, "zones"> & {
        zones: {
            [Kind in keyof State["zones"] as Kind extends "dungeon" ? "draw" : Kind extends "room" ? "board" : Kind]:
                Omit<State["zones"][Kind], "type"> & {type: Kind extends "dungeon" ? "draw" : Kind extends "room" ? "board" : Kind};
        };
    }
    : never;

export type OldZoneGameStateType = WithOldZoneNames<GameStateType | PreAnimationGameStateType | PreLifecycleGameStateType | HeroLessGameStateType | HandGameStateType>;

export type LegacyGameStateType = {
    seed: SeedType;
    decks: Array<InitDeckDataType<string>>;
};

export type MoveCardPayloadType = {
    cardId: string;
    from: ZoneKindType;
    to: ZoneKindType;
    targetCardId?: string;
};

export type CardMoveRejectionType = "invalidMove" | "equipmentCardNotAllowed" | "zoneFull" | "enemyRankTooHigh";

export type PlayCardPayloadType = {
    cardId: string;
    from: ZoneKindType;
};

export type AttackCardPayloadType = {
    cardId: string;
    enemyId?: string;
};

export type GameSnapshotType = Omit<GameStateType, "log">;

type GameLogPayloadsType = {
    surrenderGame: undefined;
    startGame: undefined;
    advancePhase: undefined;
    skipRoom: undefined;
    endTurn: undefined;
    playCard: PlayCardPayloadType;
    attackCard: AttackCardPayloadType;
    moveCard: MoveCardPayloadType;
    addCardsToZone: {zone: ZoneKindType; cards: PlayingCardType[]};
    removeCardsFromZone: {zone: ZoneKindType; cardIds: string[]};
    setZoneCapacity: {zone: ZoneKindType; capacity: number};
    setRoomMinimumCardsToPlay: number;
    shuffleDungeon: undefined;
};

export type GameLogActionType = {
    [Name in keyof GameLogPayloadsType]: {type: `game/${Name}` | `classicGame/${Name}`; payload: GameLogPayloadsType[Name]};
}[keyof GameLogPayloadsType];

export type GameLogEntryType = {
    number: number;
    turnNumber: number;
    action: GameLogActionType;
    healthAfter: number;
    seedAfter: SeedType;
    outcome?: GameOutcomeType;
};

export type GameLogType = {
    version: 1;
    origin: "newGame" | "restoredGame";
    initialState: GameSnapshotType;
    entries: GameLogEntryType[];
};
