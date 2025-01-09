import { TId } from "../global"

export interface ITask {
    id: TId,
    documentId: TId,
    title: string,
    description: string,
    priority: 'low' | 'med' | 'high',
    createdAt: number,
    updatedAt: number
    dueDate: number,
    beginDate: number,
    order: number,
    isOverdue: boolean,
    files: File[]
}

export interface ITaskResponse {
    data: ITask,
    meta: {}
}

export interface ITasksResponse {
    data: ITask[],
    meta: {
        pagination: {
            page: number,
            pageCount: number,
            pageSize: number,
            total: number,
        }
    }
}

export interface IColumn {
    id: TId,
    documentId: TId,
    title: string,
    type: 'to_do' | 'in_progress' | 'review' | 'done' | null,
    createdAt: string,
    updatedAt: string,
    order: number,
    tasks: ITask[]
}

export interface IColumnResponse {
    data: IColumn,
    meta: {}
}

export interface IColumnsResponse {
    data: IColumn[],
    meta: {
        pagination: {
            page: number,
            pageCount: number,
            pageSize: number,
            total: number,
        }
    }
}