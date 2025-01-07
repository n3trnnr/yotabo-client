import { useEffect, useState } from "react";
import styles from './ModalWindow.module.scss'
import cn from 'classnames';
import Button from "../UI/Button/Button";
import SvgIcons from "../UI/Svg/SvgIcons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useStore";
import { postProjectData } from "../../store/slices/projectsSlice";
import { useModal } from "../../hoc/Contexts/ModalWindow/ModalProvider";
import ProjectModal from "./ProjectModal/ProjectModal";
import { IProjectFormData, ITaskFormData, TModalWindowFormData } from "./TModalWindow";
import TaskModal from "./TaskModal/TaskModal";

const ModalWindow = () => {
    const dispatch = useAppDispatch()
    const { isModalOpen, modalParams, handleCloseModal } = useModal();
    const [files, setFiles] = useState<File[]>([])

    const getDefaultValues = () => {
        if (modalParams?.formType === 'project') {
            return {
                title: '',
                description: '',
            }
        } else {
            return {
                title: '',
                description: '',
                priority: 'low',
                dueTime: '',
                beginTime: '',
                files: null
            }
        }
    }

    const { control, handleSubmit, watch, reset, // formState: { errors, isValid }
    } = useForm<TModalWindowFormData>({
        mode: 'onChange',
        defaultValues: getDefaultValues()
    })

    useEffect(() => {
        if (modalParams?.formType === 'task') {
            const subscription = watch((formData) => {
                const data = formData as ITaskFormData
                if (data.files && data.files.length > 0) {
                    const file = data.files[0];
                    if (file) {
                        setFiles((prevFiles) => {
                            if (prevFiles.findIndex((f) => f.name === file.name) === -1) {
                                return [...prevFiles, file];
                            }
                            return prevFiles;
                        });
                    }
                }
            })

            return () => subscription.unsubscribe()
        }
    }, [watch, modalParams])

    const handleSetFiles = (newFiles: File[]) => {
        if (newFiles) {
            setFiles((prevState) => {
                if (prevState.every((file) => newFiles.findIndex((newFile) => newFile.name === file.name))) {
                    return [...prevState, ...newFiles]
                }
                return prevState
            })
        }
    }

    const handleDeleteFile = (name: string) => {
        setFiles((prevState) => {
            return prevState.filter((file) => {
                return file.name !== name
            })
        })
    }

    const onSubmit: SubmitHandler<TModalWindowFormData> = (data) => {
        if (modalParams?.formType === 'project') {
            postProjectFormData(data as IProjectFormData)
        } else if (modalParams?.formType === 'task') {
            postTaskFormData({ ...data, files: files } as ITaskFormData)
            setFiles([])
        }

        reset()
        handleCloseModal()
    }

    const postProjectFormData = (data: IProjectFormData) => {
        dispatch(postProjectData(data))
    }

    const postTaskFormData = (data: ITaskFormData) => {
        console.log(data);
        // dispatch(postTaskData(data))
    }

    const closeModalWindow = () => {
        reset()
        setFiles([])
        handleCloseModal()
    }

    if (!isModalOpen) return null;

    return (
        <div className={styles['overlay']}>
            <div className={styles['modal-window']}>
                <div className={styles["modal-window__inner"]}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>

                        <div className={styles['form__items']}>
                            <div className={styles.title}>{modalParams?.title}</div>

                            {modalParams?.formType === 'project' && <ProjectModal control={control} name={{ title: 'title', description: 'description' }} />}
                            {modalParams?.formType === 'task' && <TaskModal
                                handleSetFiles={handleSetFiles}
                                handleDeleteFile={handleDeleteFile}
                                files={files}
                                control={control}
                                name={{
                                    title: 'title',
                                    description: 'description',
                                    priority: 'priority',
                                    dueTime: 'dueTime',
                                    beginTime: 'beginTime',
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