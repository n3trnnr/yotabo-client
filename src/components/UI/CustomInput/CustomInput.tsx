import { Controller, FieldValues } from "react-hook-form";
import { ICustomInput } from "./CustomInput.props";


const CustomInput = <T extends FieldValues>({ label, name, control, rules }: ICustomInput<T>) => {
    return (
        <Controller name={name} control={control} rules={rules} render={({ field, fieldState: { error } }) => (
            <div>
                <label>{label}</label>
            </div>
        )} />
    );
}

export default CustomInput;