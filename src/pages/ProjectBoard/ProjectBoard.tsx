import styles from './ProjectBoard.module.scss'
import TaskCard from "../../components/TaskCard/TaskCard";
import { useAppDispatch } from '../../hooks/useStore';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import Column from '../../components/Column/Column';
import { useModal } from '../../hoc/Contexts/ModalWindow/ModalProvider';
import { TId } from '../../interfaces/global';
import { deleteColumn, editColumn } from '../../store/slices/boardSlice';
import { useOutletContext } from 'react-router-dom';
import ColumnForm from '../../components/ColumnForm/ColumnForm';
import Loader from '../../components/Loader/Loader';
import { sortColumns } from '../../helpers/sortColumns';
import { IOutletContext } from '../../interfaces/IOutletContext';

const ProjectBoard = () => {

    const { project, columns } = useOutletContext<IOutletContext>();
    const dispatch = useAppDispatch();
    const { handleOpenModal, handleModalParams } = useModal();

    const handleEditColumnTitle = (title: string, columnId: TId) => {
        if (title && columnId) {
            dispatch(editColumn({ field: 'title', value: title, id: columnId }))
        }
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

    const handleDeleteTask = () => { }

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
                </div>
            </div>

            <div className={styles['columns']}>
                <div className={styles['columns__inner']}>
                    {columns && [...sortColumns(columns)].map((column) => (
                        <Column
                            key={column.documentId}
                            column={column}
                            handleCreateTask={handleCreateTask}
                            handleDeleteColumn={handleDeleteColumn}
                            handleEditColumnTitle={handleEditColumnTitle}
                        >
                            {column.tasks && column.tasks.map((task) => (
                                <TaskCard
                                    key={task.documentId}
                                    task={task}
                                    handleDeleteTask={handleDeleteTask}
                                />
                            ))}
                        </Column>
                    ))}
                    <ColumnForm />
                </div>
            </div>
        </div>
    );
}

export default ProjectBoard;