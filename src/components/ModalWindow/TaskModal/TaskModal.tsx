import styles from './TaskModal.module.scss'
import { ITaskModal } from "./TaskModal.props";
import { Controller, FieldValues } from 'react-hook-form';
import cn from 'classnames'

const TaskModal = <T extends FieldValues>({ control, name }: ITaskModal<T>) => {

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

            <div className={styles['task-settings']}>
                <div className={styles['priority']}>
                    <span>Priority</span>
                    <Controller
                        control={control}
                        name={name.priority}
                        render={({ field }) => (
                            <div className={styles['radios']}>
                                <input className={styles['input-radio']} {...field} type="radio" id={'low'} name={'priority'} value={'low'} defaultChecked />
                                <label className={cn(styles['label'], styles['label__low'])} htmlFor={'low'}>
                                    <div className={cn(styles['dote'], styles['dote__low'])} />
                                    <span className={styles['radio-title']}>Low</span>
                                </label>

                                <input className={styles['input-radio']} {...field} type="radio" id={'med'} name={'priority'} value={'med'} />
                                <label className={cn(styles['label'], styles['label__med'])} htmlFor={'med'}>
                                    <div className={cn(styles['dote'], styles['dote__med'])} />
                                    <span className={styles['radio-title']}>Med</span>
                                </label>

                                <input className={styles['input-radio']} {...field} type="radio" id={'high'} name={'priority'} value={'high'} />
                                <label className={cn(styles['label'], styles['label__high'])} htmlFor={'high'}>
                                    <div className={cn(styles['dote'], styles['dote__high'])} />
                                    <span className={styles['radio-title']}>High</span>
                                </label>
                            </div>
                        )}
                    />
                </div>

                <div className={styles['dates']}>
                    <Controller control={control} name={name.begin_time} render={({ }) => (
                        <label>
                            Begin time
                            <input type="date" name="" id="" />
                        </label>
                    )} />

                    <Controller control={control} name={name.due_time} render={({ }) => (
                        <label>
                            Due time
                            <input type="date" name="" id="" />
                        </label>
                    )} />
                </div>
            </div>

            <div className={styles['files']}>
                <input type="file" name="" id="file" />
                <label htmlFor="file">
                    Drag and Drop a file here or click
                </label>
            </div>
        </>
    );
}

export default TaskModal;