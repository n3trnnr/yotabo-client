import styles from './ProjectBoard.module.scss'
import TaskCard from "../../components/TaskCard/TaskCard";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { useEffect } from 'react';
import { getTasksData } from '../../store/slices/taskSlice';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import Column from '../../components/Column/Column';

const ProjectBoard = () => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.tasks.tasks)
    // console.log('tasks', tasks);

    useEffect(() => {
        dispatch(getTasksData())
    }, [])

    return (
        <div className={styles['board-container']}>

            <div className={styles['board-header']}>
                <ProgressBar progressPercentage={0} />

                <div className={styles['action-buttons']}>
                    <Button className={styles['button-filter']}>
                        <>
                            <SvgIcons svgIcon={'filter'} /> <span>Filter</span> <SvgIcons svgIcon={'arrowDown'} />
                        </>
                    </Button>

                    <Button className={styles['button-add']} title={'Add Column'}>
                        <SvgIcons svgIcon={'add'} />
                    </Button>
                </div>
            </div>

            <div className={styles['columns']}>
                <Column>
                    <TaskCard />
                </Column>
                <Column>
                    <TaskCard />
                </Column>
                <Column>
                    <TaskCard />
                </Column>
            </div>

        </div>
    );
}

export default ProjectBoard;