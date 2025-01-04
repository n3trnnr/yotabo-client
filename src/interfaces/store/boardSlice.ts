import { TId } from "../global"
import { IModalWindowFormData } from '../../components/ModalWindow/ModalWindow';

export interface ITaskFormData extends IModalWindowFormData {
    columnId: TId
}

export interface IColumnFormData extends IModalWindowFormData {
    // projectId: TId | null
}

export interface ITask {
    id: TId,
    documentId: TId,
    title: string,
    description: string,
    priority: 'low' | 'med' | 'high',
    createdAt: number,
    updatedAt: number
    deadline: number,
    order: number,
    isOverdue: boolean,
    file: File
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
    tasks: { data: ITask[] }
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