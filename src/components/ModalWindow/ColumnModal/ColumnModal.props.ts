import { Control, FieldValues, Path } from "react-hook-form";

export interface IColumnModal<T extends FieldValues> {
    control: Control<T>,
    name: {
        title: Path<T>,
        columnType: Path<T>
    }
}