import { IModalWindowFormData } from "../../components/ModalWindow/ModalWindow"
import { TId } from "../global"

export interface IProjectFormData extends IModalWindowFormData {
    user?: TId
}

export interface IProject {
    id: TId,
    documentId: TId,
    title: string,
    description: string,
    isFavorite: boolean,
    progress: number,
    createdAt: string
    isDeleted: boolean,
    hex: string
}

export interface IProjectResponse {
    data: IProject,
    meta: {}
}

export interface IProjectsResponse {
    data: IProject[],
    meta: {
        pagination: {
            page: number,
            pageCount: number,
            pageSize: number,
            total: number,
        }
    }
}