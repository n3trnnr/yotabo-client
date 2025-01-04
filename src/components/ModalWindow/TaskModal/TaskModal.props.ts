import { Control, FieldValues, Path } from "react-hook-form";

export interface ITaskModal<T extends FieldValues> {
    control: Control<T>,
    name: {
        title: Path<T>,
        description: Path<T>,
        priority: Path<T>,
        due_time: Path<T>,
        begin_time: Path<T>,
        files: Path<T>
    }
}