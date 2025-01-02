import { FieldValues } from "react-hook-form";
import { IColumnModal } from "./ColumnModal.props";
import CustomInput from "../../UI/CustomInput/CustomInput";
import styles from './ColumnModal.module.scss'


const ColumnModal = <T extends FieldValues>({ control, name }: IColumnModal<T>) => {
    return (
        <>
            <CustomInput
                type={'text'}
                control={control}
                name={name.title}
                className={styles['input-title']}
                errorClassName={styles['error-message']}
                placeHolder={'Title'}
                rules={{
                    required: { value: true, message: 'This field is required' }
                }}
            />

            <div className={styles['radios']}>
                <CustomInput
                    type={'radio'}
                    params={[
                        { title: 'Default', name: 'columnType', value: 'default', isDefault: true },
                        { title: 'To do', name: 'columnType', value: 'to_do' },
                        { title: 'Done', name: 'columnType', value: 'done' }
                    ]}
                    control={control}
                    name={name.columnType}
                    labelClassName={styles['label-radio']}
                    className={styles['input-radio']}
                    errorClassName={styles['error-message']}
                />
            </div>
        </>
    );
}

export default ColumnModal;