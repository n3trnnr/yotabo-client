import { TId } from "../../interfaces/global";
import { IProjectData } from "../../interfaces/store/projectSlice";

export interface IProjectCard {
    projectData: IProjectData,
    deleteProject: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: TId) => void
}