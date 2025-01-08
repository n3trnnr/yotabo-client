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
import { deleteColumn, editColumn, getColumnsData } from '../../store/slices/boardSlice';
import { useOutletContext } from 'react-router-dom';
import { IProject } from '../../interfaces/store/projectsSlice';
import ColumnForm from '../../components/ColumnForm/ColumnForm';
import Loader from '../../components/Loader/Loader';

const ProjectBoard = () => {
    const project = useOutletContext<IProject | null>();
    const columns = useAppSelector((state) => state.board.columns)

    const dispatch = useAppDispatch();
    const { handleOpenModal, handleModalParams } = useModal();

    useEffect(() => {
        if (project) {
            dispatch(getColumnsData(project.documentId))
        }
    }, [project])

    const handleEditColumnTitle = (title: string, columnId: TId) => {
        dispatch(editColumn({ field: 'title', value: title, id: columnId }))
    }

    const handleDeleteColumn = (id: TId) => {
        if (id) {
            dispatch(deleteColumn(id))
        }
    }

    const handleCreateTask = (id: TId) => {
        handleOpenModal()
        handleModalParams({ formType: 'task', title: 'Create task', id: id })
    }

    if (!project || !columns) return (<Loader />)

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

                    <Button className={styles['button-files']}>
                        <>
                            <SvgIcons svgIcon={'file'} /> <span>Files</span>
                        </>
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
                    <ColumnForm />
                </div>
            </div>
        </div>
    );
}

export default ProjectBoard;