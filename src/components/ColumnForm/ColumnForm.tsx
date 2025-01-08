import { useState } from 'react';
import SvgIcons from '../UI/Svg/SvgIcons';
import styles from './ColumnForm.module.scss'
import { useAppDispatch } from '../../hooks/useStore';
import { postColumnData } from '../../store/slices/boardSlice';

const ColumnForm = () => {
    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title)
    }

    const handleBlur = () => {
        if (title.length) {
            onSubmit()
        }
        handleEditMode()
        setTitle('')
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key
        if (key === 'Escape') {
            setEditMode(false)
        }
        if (key === 'Enter') {
            onSubmit()
            setEditMode(false)
        }
    }

    const onSubmit = () => {
        dispatch(postColumnData({ title }))
    }

    return (
        <div className={styles['column-form']}>
            <div className={styles['column-form__inner']}>
                <div
                    className={styles['form-header']}
                    onClick={handleEditMode}
                >
                    {editMode ?

                        <label className={styles['label-title']}>
                            <input
                                className={styles['input']}
                                type="text"
                                autoFocus
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                value={title}
                            />
                        </label>
                        : <div className={styles['button']}>
                            <SvgIcons svgIcon={'add'} />
                            <span>Add column</span>
                        </div>
                    }
                </div>
                <div className={styles['plug']} onBlur={handleBlur}>
                    {!editMode && <div onClick={handleEditMode} />}
                </div>
            </div>
        </div>
    );
}

export default ColumnForm;