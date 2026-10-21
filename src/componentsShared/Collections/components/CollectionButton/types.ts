import {AppSelector} from "store/types.ts";
import {CollectionStatisticsType} from "store/features/collections/selectors.ts";

export type CollectionButtonPropsType<T extends CollectionStatisticsType> = {
    className?: string;
    translationKey: string;
    selector: AppSelector<T>;
    onClick?: () => void;
};