import { Controller, FieldValues } from "react-hook-form";
import { ICustomInput } from "./CustomInput.props";


const CustomInput = <T extends FieldValues>({ type, placeHolder, className, errorClassName, labelClassName, label, name, control, rules }: ICustomInput<T>) => {

    if (type === 'text' || 'password' || 'email') return (
        <Controller name={name} control={control} rules={rules} render={({ field, fieldState: { error } }) => (
            <label className={labelClassName}>
                {label}
                <input className={className} type={type} placeholder={placeHolder} {...field} />
                {error && <div className={errorClassName}>{error.message}</div>}
            </label>
        )} />
    );

    if (type === 'textaria') return (
        <Controller name={name} control={control} rules={rules} render={({ field, fieldState: { error } }) => (
            <label className={labelClassName}>
                {label}
                <textarea className={className} {...field} placeholder={placeHolder} />
                {error && <div className={errorClassName}>{error.message}</div>}
            </label>
        )} />
    )
}

export default CustomInput;