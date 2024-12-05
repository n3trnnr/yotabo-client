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

const ModalWindow = ({ type, modalWindowTitle, handleShowModal }: IModalWindow) => {

    const dispatch = useAppDispatch()

    const [files, setFiles] = useState<IFile[]>([])
    console.log('files', files);

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
        handleShowModal(false)
    }

    const postProjectFormData = (data: IModalWindowInputs) => {
        dispatch(postProjectData(data))
    }

    const postTaskFormData = (data: IModalWindowInputs) => {
        dispatch(postTaskData(data))
    }

    return (
        <div className={styles["modal-window-container"]}>
            <form onSubmit={handleSubmit(submit)} className={styles["form-wrapper"]}>
                <div className={styles.title}>{modalWindowTitle}</div>
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
                <div className={styles["buttons-wrapper"]}>
                    <button type="submit" className={styles["button-create"]}>Create</button>
                    <input type="button" onClick={() => handleShowModal(false)} className={styles["button-cancel"]} value={"Cancel"} />
                </div>
            </form>

            <Button handleClick={() => handleShowModal(false)} colorStyle={"none"} buttonShape={"none"} styleName={styles['cross-close']}>
                <SvgIcons iconName={"cross"} />
            </Button>
        </div>
    );
}

export default ModalWindow;