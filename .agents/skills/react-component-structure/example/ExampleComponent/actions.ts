import {showDialogModal} from "store/features/dialog";
import type {AppDispatch, RootState} from "store/types.ts";
import {exampleItemsSelector} from "./selectors.ts";

export const showExampleSummary = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const items = exampleItemsSelector(getState());

    dispatch(showDialogModal({
        content: `Showing ${items.length} blueprints.`
    }));
};
