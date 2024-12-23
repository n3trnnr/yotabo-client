import { ChangeEvent, ReactNode } from "react";

export interface IColumn {
    children: ReactNode,
    handleCreateTask: () => void,
    columnTitle: string,
    handleSetColumnTitle: (event: ChangeEvent<HTMLInputElement>) => void
}