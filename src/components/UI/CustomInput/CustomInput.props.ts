import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface ICustomInput<T extends FieldValues> {
    label: string,
    name: Path<T>,
    control: Control<T>,
    rules?: RegisterOptions
}