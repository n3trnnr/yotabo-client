import { FieldValues } from "react-hook-form";
import { IProjectModal } from "./ProjectModal.props";
import CustomInput from "../../UI/CustomInput/CustomInput";
import styles from './ProjectModal.module.scss'

const ProjectModal = <T extends FieldValues>({ control, name }: IProjectModal<T>) => {
    return (
        <>
            <CustomInput
                type={'text'}
                control={control}
                className={styles["input-title"]}
                errorClassName={styles['error-message']}
                name={name.title}
                placeHolder={'Title'}
                rules={{
                    required: { value: true, message: 'Title is required' },
                }}
            />

            <CustomInput
                type={'textaria'}
                control={control}
                className={styles['textarea-description']}
                errorClassName={styles['error-message']}
                name={name.description}
                placeHolder={'Description'}
                rules={{
                    required: { value: true, message: 'Description is required' }
                }}
            />
        </>
    );
}

export default ProjectModal;