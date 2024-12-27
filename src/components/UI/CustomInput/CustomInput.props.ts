import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface ICustomInput<T extends FieldValues> {
    type: 'text' | 'textaria' | 'password' | 'email' | 'radio' | 'date' | 'file',
    placeHolder?: string;
    label?: string,
    name: Path<T>,
    control: Control<T>,
    rules: RegisterOptions,
    labelClassName?: string,
    className: string,
    errorClassName: string
}