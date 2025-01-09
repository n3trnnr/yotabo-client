import { ReactNode } from "react";
import { TId } from "../../interfaces/global";
import { IColumn } from "../../interfaces/store/boardSlice";

export interface IColumnProps {
    column: IColumn,
    children: ReactNode,
    handleCreateTask: (id: TId) => void,
    handleDeleteColumn: (id: TId) => void,
    handleEditColumnTitle: (title: string, columnId: TId) => void
}