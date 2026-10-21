import {Dispatch, SetStateAction} from "react";

export type PaginatedGridPropsType = {
    className?: string;
    numberOfItems: number;
    rowSize: number;
    columnSize: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
};