export interface IProjectFormData {
    title: string,
    description: string
}

export interface IColumnFormData {
    title: string
}

export interface ITaskFormData {
    title: string,
    description: string,
    priority: 'low' | 'med' | 'high',
    due_time: Date,
    begin_time: Date,
    files?: File[]
}

export type TModalWindowFormData = IProjectFormData | IColumnFormData | ITaskFormData;
