import { useEffect, useState } from "react";
import styles from './ModalWindow.module.scss'
import cn from 'classnames';
import Button from "../UI/Button/Button";
import SvgIcons from "../UI/Svg/SvgIcons";
import { SubmitHandler, useForm } from "react-hook-form";
import { IModalWindow } from "./ModalWindow.props";
import { useAppDispatch } from "../../hooks/useStore";
import { postProjectData } from "../../store/slices/projectsSlice";
// import { postTaskData } from "../../store/slices/taskSlice";
import { postColumnData } from "../../store/slices/boardSlice";
import { useModal } from "../../hoc/Contexts/ModalWindow/ModalProvider";
import ProjectModal from "./ProjectModal/ProjectModal";
import ColumnModal from "./ColumnModal/ColumnModal";
import TaskModal from "./TaskModal/TaskModal";

export interface IModalWindowFormData {
    title: string,
    description: string,
    priority?: 'low' | 'med' | 'high',
    columnType?: 'default' | 'to_do' | 'done',
    deadline?: string,
    files?: File[]
}

export interface IFile {
    name: string,
    size: number,
}

const ModalWindow = ({ type, title }: IModalWindow) => {

    const dispatch = useAppDispatch()
    const [files, setFiles] = useState<IFile[]>([])
    const { isModalOpen, handleCloseModal } = useModal();

    const { control, handleSubmit, watch, reset, // formState: { errors, isValid }
    } = useForm<IModalWindowFormData>({
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            // columnType: 'default'
        }
    })

    useEffect(() => {
        const subscription = watch((data) => {
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

    const submit: SubmitHandler<IModalWindowFormData> = (data) => {
        console.log('data', data);

        if (type === 'project') {
            postProjectFormData(data)
        } else if (type === 'task') {
            postTaskFormData(data)
        } else if (type === 'column') {

        }
        reset()
        handleCloseModal()
    }

    const closeModalWindow = () => {
        reset()
        handleCloseModal()
    }

    const postProjectFormData = (data: IModalWindowFormData) => {
        dispatch(postProjectData(data))
    }

    const postColumnFormData = (data: IModalWindowFormData) => {
        // dispatch(postColumnData)
    }

    const postTaskFormData = (data: IModalWindowFormData) => {
        // dispatch(postTaskData(data))
    }

    if (!isModalOpen) return;

    return (
        <div className={styles['overlay']}>
            <div className={styles['modal-window']}>
                <div className={styles["modal-window__inner"]}>
                    <form onSubmit={handleSubmit(submit)} className={styles["form"]}>

                        <div className={styles['form__items']}>
                            <div className={styles.title}>{title}</div>

                            {/* <ProjectModal control={control} name={{ title: 'title', description: 'description' }} /> */}
                            <ColumnModal control={control} name={{ title: 'title', columnType: 'columnType' }} />
                            {/* 
                            {type === "task" &&
                                <TaskModal
                                    register={register}
                                    files={files}
                                    handleDeleteFile={handleDeleteFile}
                                />
                            } */}
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