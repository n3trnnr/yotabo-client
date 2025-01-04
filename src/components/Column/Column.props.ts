import { ReactNode } from "react";
import { TId } from "../../interfaces/global";

export interface IColumn {
    id: TId,
    children: ReactNode,
    title: string,
    handleCreateTask: () => void,
    handleDeleteColumn: (id: TId) => void,
    handleEditColumnTitle: (title: string, columnId: TId) => void
}