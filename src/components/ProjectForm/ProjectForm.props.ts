import { Control, FieldValues, Path } from "react-hook-form";

export interface IProjectForm<T extends FieldValues> {
    control: Control<T>,
    name: {
        title: Path<T>,
        description: Path<T>
    }
}