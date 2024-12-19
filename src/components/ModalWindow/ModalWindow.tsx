import { useEffect, useState } from "react";
import styles from './ModalWindow.module.scss'
import Button from "../UI/Button/Button";
import SvgIcons from "../UI/Svg/SvgIcons";
import AdvancedSettings from "./AdvancedSettings/AdvancedSettings";
import { SubmitHandler, useForm } from "react-hook-form";
import { IModalWindow } from "./ModalWindow.props";
import { useAppDispatch } from "../../hooks/useStore";
import { postProjectData } from "../../store/slices/projectSlice";
import { postTaskData } from "../../store/slices/taskSlice";
import { useModal } from "../../hoc/Contexts/ModalWindow/ModalProvider";
import cn from 'classnames';

export interface IModalWindowInputs {
    title: string,
    description: string,
    priority?: 'low' | 'med' | 'high',
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
    // console.log('files', files);

    const { isModalOpen, handleCloseModal } = useModal();

    const { register, handleSubmit, watch, reset, // formState: { errors, isValid }
    } = useForm<IModalWindowInputs>({ mode: 'onBlur' })

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

    const submit: SubmitHandler<IModalWindowInputs> = async (data) => {
        if (type === "simple") {
            postProjectFormData(data)
        } else if (type === "advanced") {
            postTaskFormData(data)
        }
        reset()
        handleCloseModal()
    }

    const postProjectFormData = (data: IModalWindowInputs) => {
        dispatch(postProjectData(data))
    }

    const postTaskFormData = (data: IModalWindowInputs) => {
        dispatch(postTaskData(data))
    }

    if (!isModalOpen) return null;

    return (
        <div className={styles['overlay']}>
            <div className={styles['modal-window']}>
                <div className={styles["modal-window__inner"]}>
                    <form onSubmit={handleSubmit(submit)} className={styles["form"]}>

                        <div className={styles['form__items']}>
                            <div className={styles.title}>{title}</div>
                            <input
                                {...register('title')}
                                name="title"
                                className={styles["input-title"]} type="text"
                                required
                                placeholder="Title"
                            />
                            <textarea
                                {...register('description')}
                                className={styles["textarea-description"]}
                                rows={5}
                                cols={40}
                                required
                                placeholder="Description"
                            />
                            {type === "advanced" &&
                                <AdvancedSettings
                                    register={register}
                                    files={files}
                                    handleDeleteFile={handleDeleteFile}
                                />
                            }
                        </div>

                        <div className={styles["form__buttons"]}>
                            <Button type="submit" className={cn(styles["button"], styles['button__create'])}>Create</Button>
                            <input type="button" onClick={handleCloseModal} className={cn(styles["button"], styles['button__cancel'])} value={"Cancel"} />
                        </div>
                    </form>

                    <Button onClick={handleCloseModal} className={styles['cross-close']}>
                        <SvgIcons svgIcon={"close"} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;