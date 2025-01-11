import { Control, FieldValues, Path } from "react-hook-form";

export interface ITaskForm<T extends FieldValues> {
    control: Control<T>,
    name: {
        title: Path<T>,
        description: Path<T>,
        priority: Path<T>,
        dueTime: Path<T>,
        beginTime: Path<T>,
        files: Path<T>,
    }
    files: File[],
    handleDeleteFile: (name: string) => void,
    handleSetFiles: (newFiles: File[]) => void
}