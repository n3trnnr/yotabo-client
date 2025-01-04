import { Controller, FieldValues } from "react-hook-form";
import { IProjectModal } from "./ProjectModal.props";
import styles from './ProjectModal.module.scss'

const ProjectModal = <T extends FieldValues>({ control, name }: IProjectModal<T>) => {
    return (
        <>
            <Controller
                control={control}
                name={name.title}
                rules={{
                    required: { value: true, message: 'Title is required' },
                }}
                render={({ field, fieldState: { error } }) => (
                    <label className={styles['']}>
                        <input className={styles["input-title"]} placeholder={'Title'} {...field} />
                        {error && <div className={styles['error-message']}>{error.message}</div>}
                    </label>
                )}
            />

            <Controller
                control={control}
                name={name.description}
                rules={{
                    required: { value: true, message: 'Description is required' }
                }}
                render={({ field, fieldState: { error } }) => (
                    <label className={''}>
                        <textarea className={styles['textarea-description']} {...field} placeholder={'Description'} />
                        {error && <div className={styles['error-message']}>{error.message}</div>}
                    </label>
                )}
            />
        </>
    );
}

export default ProjectModal;