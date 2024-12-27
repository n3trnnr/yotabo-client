import styles from './ProjectBoard.module.scss'
import TaskCard from "../../components/TaskCard/TaskCard";
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { useEffect } from 'react';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import Column from '../../components/Column/Column';
import { useModal } from '../../hoc/Contexts/ModalWindow/ModalProvider';
import { TId } from '../../interfaces/global';
import { deleteColumn, editColumn, getBoardData } from '../../store/slices/boardSlice';
import { useOutletContext } from 'react-router-dom';
import { IProject } from '../../interfaces/store/projectsSlice';

const ProjectBoard = () => {

    const columns = useAppSelector((state) => state.board.columns)

    const project = useOutletContext<IProject | null>();

    const dispatch = useAppDispatch();
    const { handleOpenModal, handleModalParams } = useModal();

    useEffect(() => {
        if (project) {
            dispatch(getBoardData(project.documentId))
        }
    }, [project])

    const handleCreateColumn = () => {
        handleOpenModal()
        handleModalParams({ type: 'column', title: 'Create column' })
    }

    const handleEditColumnTitle = (title: string, columnId: TId) => {
        dispatch(editColumn({ field: 'title', value: title, id: columnId }))
    }

    const handleDeleteColumn = (id: TId) => {
        if (id) dispatch(deleteColumn(id))
    }

    const handleCreateTask = () => {
        handleOpenModal()
        handleModalParams({ type: 'task', title: 'Create task' })
    }

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

                    <Button onClick={handleCreateColumn} className={styles['button-add']} title={'Add Column'}>
                        <SvgIcons svgIcon={'add'} />
                    </Button>
                </div>
            </div>

            <div className={styles['columns']}>
                <div className={styles['columns__inner']}>
                    {columns && columns.map((column) => (
                        <Column
                            key={column.documentId}
                            id={column.documentId}
                            handleCreateTask={handleCreateTask}
                            handleDeleteColumn={handleDeleteColumn}
                            handleEditColumnTitle={handleEditColumnTitle}
                            title={column.title}
                        >
                            <TaskCard />
                        </Column>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ProjectBoard;