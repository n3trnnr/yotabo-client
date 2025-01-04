import { Controller, FieldValues } from "react-hook-form";
import { IColumnModal } from "./ColumnModal.props";
import styles from './ColumnModal.module.scss'


const ColumnModal = <T extends FieldValues>({ control, name }: IColumnModal<T>) => {
    return (
        <>
            <Controller
                control={control}
                name={name.title}
                rules={{
                    required: { value: true, message: 'Title is required' },
                }}
                render={({ field, fieldState: { error } }) => (
                    <label className={styles['']}>
                        <input className={styles["input-title"]} placeholder={'Title'} {...field} />
                        {error && <div className={styles['error-message']}>{error.message}</div>}
                    </label>
                )}
            />
        </>
    );
}

export default ColumnModal;