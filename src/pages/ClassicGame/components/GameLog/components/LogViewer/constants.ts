import type {GameLogActionType, ZoneKindType} from "entities/game/types.ts";
import type {TranslationKeysType} from "localization/types.ts";

export const ZONE_LABELS: Record<ZoneKindType, TranslationKeysType> = {
    dungeon: "ui.deck.dungeon.label",
    discard: "ui.deck.discard.label",
    crypt: "ui.deck.crypt.label",
    room: "ui.zone.room",
    weapons: "ui.zone.weapons",
    potions: "ui.zone.potions",
};

export const ACTION_LABELS: Record<GameLogActionType["type"], TranslationKeysType> = {
    "game/surrenderGame": "ui.game.surrender",
    "game/startGame": "ui.gameLog.action.startGame",
    "game/advancePhase": "ui.gameLog.action.advancePhase",
    "game/skipRoom": "ui.gameLog.action.skipRoom",
    "game/endTurn": "ui.gameLog.action.endTurn",
    "game/playCard": "ui.gameLog.action.playCard",
    "game/attackCard": "ui.gameLog.action.attackCard",
    "game/moveCard": "ui.gameLog.action.moveCard",
    "game/addCardsToZone": "ui.gameLog.action.addCardsToZone",
    "game/removeCardsFromZone": "ui.gameLog.action.removeCardsFromZone",
    "game/setZoneCapacity": "ui.gameLog.action.setZoneCapacity",
    "game/setRoomMinimumCardsToPlay": "ui.gameLog.action.setRoomMinimumCardsToPlay",
    "game/shuffleDungeon": "ui.gameLog.action.shuffleDungeon",
    "classicGame/surrenderGame": "ui.game.surrender",
    "classicGame/startGame": "ui.gameLog.action.startGame",
    "classicGame/advancePhase": "ui.gameLog.action.advancePhase",
    "classicGame/skipRoom": "ui.gameLog.action.skipRoom",
    "classicGame/endTurn": "ui.gameLog.action.endTurn",
    "classicGame/playCard": "ui.gameLog.action.playCard",
    "classicGame/attackCard": "ui.gameLog.action.attackCard",
    "classicGame/moveCard": "ui.gameLog.action.moveCard",
    "classicGame/addCardsToZone": "ui.gameLog.action.addCardsToZone",
    "classicGame/removeCardsFromZone": "ui.gameLog.action.removeCardsFromZone",
    "classicGame/setZoneCapacity": "ui.gameLog.action.setZoneCapacity",
    "classicGame/setRoomMinimumCardsToPlay": "ui.gameLog.action.setRoomMinimumCardsToPlay",
    "classicGame/shuffleDungeon": "ui.gameLog.action.shuffleDungeon",
};
