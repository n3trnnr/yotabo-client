import { Controller, FieldValues } from "react-hook-form";
import { ICustomInput } from "./CustomInput.props";
import styles from './CustomInput.module.scss'
import React from "react";

const CustomInput = <T extends FieldValues>({ type, placeHolder, className, errorClassName, labelClassName, label, name, control, rules, params }: ICustomInput<T>) => {

    return (
        <Controller name={name} control={control} rules={rules} render={({ field, fieldState: { error } }) => (
            <>
                {(type === 'text' || type === 'password' || type === 'email') &&
                    <label className={labelClassName}>
                        {label}
                        <input className={className} type={type} placeholder={placeHolder} {...field} />
                        {error && <div className={errorClassName}>{error.message}</div>}
                    </label>
                }

                {type === 'textaria' &&
                    <label className={labelClassName}>
                        {label}
                        <textarea className={className} {...field} placeholder={placeHolder} />
                        {error && <div className={errorClassName}>{error.message}</div>}
                    </label>
                }

                {type === 'radio' &&
                    <>
                        {params && params.map((item) => (
                            <React.Fragment key={item.value}>
                                <input className={styles['input-radio']} {...field} type="radio" id={item.value} name={item.name} value={item.value} />
                                <label className={styles['label']} htmlFor={item.value} defaultValue={item.title}>
                                    <div />
                                    <span>{item.title}</span>
                                </label>

                                {/* {item.isDefault
                                    ? <input className={styles['input-radio']} {...field} type="radio" id={item.value} name={item.name} value={item.value} />
                                    : <input className={styles['input-radio']} {...field} type="radio" id={item.value} name={item.name} value={item.value} />
                                } */}
                            </React.Fragment>
                        ))}
                    </>
                }


            </>
        )} />
    );
}

export default CustomInput;