import { useEffect, useState } from "react";
import styles from './ModalWindow.module.scss'
import cn from 'classnames';
import Button from "../UI/Button/Button";
import SvgIcons from "../UI/Svg/SvgIcons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useStore";
import { postProjectData } from "../../store/slices/projectsSlice";
import { postColumnData } from "../../store/slices/boardSlice";
import { useModal } from "../../hoc/Contexts/ModalWindow/ModalProvider";
import ProjectModal from "./ProjectModal/ProjectModal";
import ColumnModal from "./ColumnModal/ColumnModal";
import { IColumnFormData, IProjectFormData, ITaskFormData, TModalWindowFormData } from "./TModalWindow";
import TaskModal from "./TaskModal/TaskModal";

export interface IFile {
    name: string,
    size: number,
}

const ModalWindow = () => {
    const dispatch = useAppDispatch()
    const { isModalOpen, modalParams, handleCloseModal } = useModal();
    const [files, setFiles] = useState<IFile[]>([])

    const getDefaultValues = () => {
        if (modalParams?.formType === 'project') {
            return {
                title: '',
                description: '',
            }
        } else if (modalParams?.formType === 'column') {
            return {
                title: '',
            }
        } else {
            return {
                title: '',
                description: '',
                priority: 'low',
                due_time: new Date(),
                begin_time: new Date(),
                files: []
            }
        }
    }

    const { control, handleSubmit, watch, reset, // formState: { errors, isValid }
    } = useForm<TModalWindowFormData>({
        mode: 'onChange',
        defaultValues: getDefaultValues()
    })

    useEffect(() => {
        const subscription = watch((formData) => {
            const data = formData as ITaskFormData
            if (data.files) {
                const file = data.files[0]
                if (file && files.length === 0) {
                    setFiles([...files, { name: file?.name, size: file?.size }])
                }
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, files])

    const handleDeleteFile = (name: string) => {
        const filteredFiles = files.filter((file: IFile) => file.name !== name)
        setFiles([...filteredFiles])
    }

    const submit: SubmitHandler<TModalWindowFormData> = (data) => {
        console.log('data', data);

        if (modalParams?.formType === 'project') {
            postProjectFormData(data as IProjectFormData)
        } else if (modalParams?.formType === 'column') {
            postColumnFormData(data as IColumnFormData)
        } else if (modalParams?.formType === 'task') {
            postTaskFormData(data as ITaskFormData)
        }

        reset()
        handleCloseModal()
    }

    const closeModalWindow = () => {
        reset()
        handleCloseModal()
    }

    const postProjectFormData = (data: IProjectFormData) => {
        dispatch(postProjectData(data))
    }

    const postColumnFormData = (data: IColumnFormData) => {
        dispatch(postColumnData(data))
    }

    const postTaskFormData = (data: ITaskFormData) => {
        // dispatch(postTaskData(data))
    }

    if (!isModalOpen) return null;

    return (
        <div className={styles['overlay']}>
            <div className={styles['modal-window']}>
                <div className={styles["modal-window__inner"]}>
                    <form onSubmit={handleSubmit(submit)} className={styles["form"]}>

                        <div className={styles['form__items']}>
                            <div className={styles.title}>{modalParams?.title}</div>

                            {modalParams?.formType === 'project' && <ProjectModal control={control} name={{ title: 'title', description: 'description' }} />}
                            {modalParams?.formType === 'column' && <ColumnModal control={control} name={{ title: 'title' }} />}
                            {modalParams?.formType === 'task' && <TaskModal control={control} name={{
                                title: 'title',
                                description: 'description',
                                priority: 'priority',
                                due_time: 'due_time',
                                begin_time: 'begin_time',
                                files: 'files'
                            }} />}
                        </div>

                        <div className={styles["form__buttons"]}>
                            <Button type="submit" className={cn(styles["button"], styles['button__create'])}>Create</Button>
                            <input type="button" onClick={closeModalWindow} className={cn(styles["button"], styles['button__cancel'])} value={"Cancel"} />
                        </div>
                    </form>

                    <Button onClick={closeModalWindow} className={styles['cross-close']}>
                        <SvgIcons svgIcon={"close"} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;