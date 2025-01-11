import { IColumn } from "./store/boardSlice";
import { IProject } from "./store/projectsSlice";

export interface IOutletContext {
    project: IProject,
    columns: IColumn[]
}