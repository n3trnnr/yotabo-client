import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import SvgIcons from '../UI/Svg/SvgIcons';
import styles from './Column.module.scss';
import { IColumnProps } from './Column.props';
import AdaptiveInput from '../UI/AdaptiveInput/AdaptiveInput';

const Column = ({ column, children, handleCreateTask, handleEditColumnTitle, handleDeleteColumn }: IColumnProps) => {
    const [editMode, setEditMode] = useState(false);
    const [columnTitle, setColumnTitle] = useState('');

    useEffect(() => {
        if (column) {
            setColumnTitle(column.title)
        }
    }, [column])

    const handleSetColumnTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setColumnTitle(title)
    }

    const handleBlurTitle = () => {
        if (column.title !== columnTitle) {
            handleEditColumnTitle(columnTitle, column.documentId)
        }
        setEditMode(false)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = event.key;

        if (key === 'Enter' && column.title !== columnTitle) {
            handleEditColumnTitle(columnTitle, column.documentId)
        } else {
            setEditMode(false)
        }
        if (key === 'Escape') {
            setEditMode(false)
        }
    }

    return (
        <div className={styles['column']}>
            <div className={styles['column__inner']}>
                <div className={styles['header']}>

                    <div className={styles['header-bar']}>
                        <Button className={styles['column-type-button']}>
                            <SvgIcons svgIcon='arrowDown' />
                        </Button>

                        <div className={styles['column-info']}>
                            {editMode
                                ? <AdaptiveInput
                                    autoFocus
                                    className={styles['title-input']}
                                    onChange={handleSetColumnTitle}
                                    onBlur={handleBlurTitle}
                                    onKeyDown={handleKeyDown}
                                    type='text'
                                    inputValue={columnTitle}
                                />
                                : <div onClick={() => setEditMode(true)} className={styles['title']}>{columnTitle}</div>
                            }
                            <div className={styles['tasks-count']}>{(column.tasks && column.tasks.length) || 0}</div>
                        </div>
                    </div>

                    <Button onClick={() => handleDeleteColumn(column.documentId)} className={styles['button-delete']}>
                        <SvgIcons svgIcon={'trash'} />
                    </Button>
                </div>

                <div className={styles['tasks-list']}>
                    {children}
                </div>

                <Button onClick={() => handleCreateTask(column.documentId)} className={styles['button-add']} title={'Add task'}>
                    <SvgIcons svgIcon={'add'} />
                </Button>
            </div>
        </div>
    );
}

export default Column;