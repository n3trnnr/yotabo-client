import { useState } from 'react';
import SvgIcons from '../UI/Svg/SvgIcons';
import styles from './ColumnForm.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useStore';
import { postColumnData } from '../../store/slices/boardSlice';

interface IColumnFormInput {
    title: string
}

const ColumnForm = () => {
    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState(false);

    const { control, handleSubmit, reset } = useForm<IColumnFormInput>({
        defaultValues: {
            title: ''
        }
    })

    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, callback: React.ChangeEventHandler<HTMLInputElement>) => {
        if (event) {
            callback(event)
        }
    }

    const onSubmit: SubmitHandler<IColumnFormInput> = (data) => {
        // dispatch(postColumnData(data))
        reset()
    }

    return (
        <div className={styles['column-form']}>
            <div className={styles['column-form__inner']}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles['form-header']} onClick={handleEditMode}>
                    {editMode ?
                        <Controller
                            control={control}
                            name={'title'}
                            rules={{ required: { value: true, message: 'Title is required' } }}
                            render={({ field, fieldState: { error } }) => (
                                <label className={styles['label-title']}>
                                    <input {...field} onChange={(event) => handleChange(event, field.onChange)} autoFocus type="text" className={styles['input']} onBlur={handleEditMode} />
                                    {error && <div className={styles['error-message']}>{error.message}</div>}
                                </label>
                            )} />
                        : <div className={styles['button']}>
                            <SvgIcons svgIcon={'add'} />
                            <span>Add column</span>
                        </div>
                    }
                </form>
                <div className={styles['plug']} onClick={handleEditMode} />
            </div>
        </div>
    );
}

export default ColumnForm;