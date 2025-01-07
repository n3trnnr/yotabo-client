
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
    dueTime: Date,
    beginTime: Date,
    files?: File[]
}

export type TModalWindowFormData = IProjectFormData | IColumnFormData | ITaskFormData;
