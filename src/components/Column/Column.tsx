import { useState } from 'react';
import Button from '../UI/Button/Button';
import SvgIcons from '../UI/Svg/SvgIcons';
import styles from './Column.module.scss';
import { IColumn } from './Column.props';
import AdaptiveInput from '../UI/AdaptiveInput/AdaptiveInput';

const Column = ({ children, handleCreateTask, columnTitle, handleSetColumnTitle }: IColumn) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div className={styles['column']}>
            <div className={styles['column__inner']}>
                <div className={styles['header']}>
                    <div>
                        <div className={styles['column-icon']}></div>
                        <div className={styles['tasks-count']}>0</div>
                    </div>

                    {editMode
                        ? <AdaptiveInput className={styles['title-input']} autoFocus onChange={handleSetColumnTitle} onBlur={() => setEditMode(false)} type='text' inputValue={columnTitle} />
                        : <span onDoubleClick={() => setEditMode(true)} className={'title'}>To do</span>
                    }

                    <Button className={styles['button-delete']}>
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