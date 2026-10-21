import {AppDispatch, RootState} from "store/types.ts";
import {updateProfileCollectionsData} from "store/features/profiles";

export const syncProfileAction = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {collections} = getState();

    if (collections) dispatch(updateProfileCollectionsData(collections));
};