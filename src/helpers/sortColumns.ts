import { IColumn } from "../interfaces/store/boardSlice";

export const sortColumns = (columns: IColumn[]) => {
    const sortedColumns = [...columns];

    return sortedColumns.sort((a, b) => {
        if (a.order > b.order) return 1
        if (a.order < b.order) return -1
        return 0
    })

} 