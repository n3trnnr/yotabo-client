import styles from './TaskModal.module.scss'
import { ITaskModal } from "./TaskModal.props";
import { Controller, FieldValues } from 'react-hook-form';
import cn from 'classnames'
import { useEffect, useRef } from 'react';
import SvgIcons from '../../UI/Svg/SvgIcons';
import Button from '../../UI/Button/Button';

const TaskModal = <T extends FieldValues>({ control, name, files, handleDeleteFile }: ITaskModal<T>) => {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.focus()
        }
    }, [])

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

            <div className={styles['priority']}>
                <span>Priority</span>
                <Controller
                    control={control}
                    name={name.priority}
                    render={({ field }) => (
                        <div className={styles['radios']}>
                            <input className={styles['input-radio']} {...field} type="radio" id={'low'} name={'priority'} value={'low'} defaultChecked />
                            <label tabIndex={0} className={cn(styles['label'], styles['label__low'])} htmlFor={'low'}>
                                <div className={cn(styles['dote'], styles['dote__low'])} />
                                <span>Low</span>
                            </label>

                            <input className={styles['input-radio']} {...field} type="radio" id={'med'} name={'priority'} value={'med'} />
                            <label tabIndex={0} className={cn(styles['label'], styles['label__med'])} htmlFor={'med'}>
                                <div className={cn(styles['dote'], styles['dote__med'])} />
                                <span>Med</span>
                            </label>

                            <input className={styles['input-radio']} {...field} type="radio" id={'high'} name={'priority'} value={'high'} />
                            <label tabIndex={0} className={cn(styles['label'], styles['label__high'])} htmlFor={'high'}>
                                <div className={cn(styles['dote'], styles['dote__high'])} />
                                <span>High</span>
                            </label>
                        </div>
                    )}
                />
            </div>

            <div className={styles['dates']}>
                <Controller control={control} name={name.beginTime} render={({ field }) => (
                    <label>
                        Begin date
                        <input type="date" {...field} />
                    </label>
                )} />

                <Controller control={control} name={name.dueTime} render={({ field }) => (
                    <label>
                        Due date
                        <input type="date" {...field} />
                    </label>
                )} />
            </div>

            <div className={styles['files']}>
                <Controller control={control} name={name.files} render={({ field }) => (
                    <div tabIndex={0} className={styles['file-controller']}>
                        <input type="file" id="file" onChange={(event) => { field.onChange(event.target.files) }} multiple />
                        <label htmlFor="file">
                            <div>
                                <SvgIcons svgIcon={'upload'} />
                                <p>Drag and Drop a file here or click</p>
                            </div>
                        </label>
                    </div>
                )} />

                {Boolean(files.length) && <ul className={styles['files-list']}>
                    {files.map((file) => (
                        <li key={`${file.size}_${file.size}`} className={styles['file-item']}>
                            <p>{file.name}</p>
                            <Button className={styles['button-delete']} onClick={() => handleDeleteFile(file.name)}>
                                <SvgIcons svgIcon={'trash'} />
                            </Button>
                        </li>
                    ))}
                </ul>}
            </div>

        </>
    );
}

export default TaskModal;