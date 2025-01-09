import { ITask } from "../../interfaces/store/boardSlice"

export interface ITaskProps {
    task: ITask,
    handleDeleteTask: (id: string | number) => void
}