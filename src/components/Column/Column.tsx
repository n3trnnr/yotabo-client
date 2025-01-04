import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import SvgIcons from '../UI/Svg/SvgIcons';
import styles from './Column.module.scss';
import { IColumn } from './Column.props';
import AdaptiveInput from '../UI/AdaptiveInput/AdaptiveInput';

const Column = ({ id, children, title, handleCreateTask, handleEditColumnTitle, handleDeleteColumn }: IColumn) => {
    const [editMode, setEditMode] = useState(false);
    const [columnTitle, setcolumnTitle] = useState('');

    useEffect(() => {
        if (title) {
            setcolumnTitle(title)
        }
    }, [title])

    const handleSetColumnTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setcolumnTitle(title)
    }

    const handleBlur = () => {
        if (title !== columnTitle) {
            handleEditColumnTitle(columnTitle, id)
        }
        setEditMode(false)
    }

    return (
        <div className={styles['column']}>
            <div className={styles['column__inner']}>
                <div className={styles['header']}>
                    <div>
                        <div className={styles['column-icon']}></div>
                        <div className={styles['tasks-count']}>0</div>
                    </div>

                    {editMode
                        ? <AdaptiveInput
                            autoFocus
                            className={styles['title-input']}
                            onChange={handleSetColumnTitle}
                            onBlur={handleBlur}
                            type='text'
                            inputValue={columnTitle}
                        />
                        : <div onDoubleClick={() => setEditMode(true)} className={'title'}>{columnTitle}</div>
                    }

                    <Button onClick={() => handleDeleteColumn(id)} className={styles['button-delete']}>
                        <SvgIcons svgIcon={'trash'} />
                    </Button>
                </div>

                <div className={styles['tasks-list']}>
                    {children}
                </div>

                <Button onClick={handleCreateTask} className={styles['button-add']} title={'Add Task'}>
                    <SvgIcons svgIcon={'add'} />
                </Button>
            </div>
        </div>
    );
}

export default Column;