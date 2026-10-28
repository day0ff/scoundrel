import {createSelector} from "@reduxjs/toolkit";
import {Selector} from "react-redux";
import {CollectionType} from "entities/types.ts";
import {InitHeroDataType} from "entities/heroes/types.ts";
import {DeckDataType} from "entities/decks/types.ts";
import type {RootState} from "../../types.ts";
import {CollectionsStateType} from "./types.ts";


export const collectionsSelector = createSelector((state: RootState) => state, (state: RootState): CollectionsStateType => state.collections);

export type CollectionStatisticsType =  {available: number, total: number};

const statisticsCollectionSelectorFactory = <T extends CollectionType>(selector:Selector<RootState, Array<T>>) => createSelector(selector, (collection: Array<T>): CollectionStatisticsType => {
    return Object.values(collection).reduce((acc, {isLocked, isNotFound}) => {
        acc.available += Number(!(isLocked || isNotFound));

        return acc;
    }, {available: 0, total: collection.length}) as CollectionStatisticsType;
});

export const heroesCollectionsSelector = createSelector(collectionsSelector, (collections:CollectionsStateType): Array<InitHeroDataType<string>> => collections.heroes);

export const heroesStatisticsCollectionSelector = statisticsCollectionSelectorFactory(heroesCollectionsSelector);


export const decksCollectionsSelector = createSelector(collectionsSelector, (collections:CollectionsStateType): Array<DeckDataType<string>> => collections.decks);

export const decksStatisticsCollectionSelector = statisticsCollectionSelectorFactory(decksCollectionsSelector);

export const packsCollectionsSelector = createSelector(collectionsSelector, collections => collections.packs);

export const packsStatisticsCollectionSelector = statisticsCollectionSelectorFactory(packsCollectionsSelector);
