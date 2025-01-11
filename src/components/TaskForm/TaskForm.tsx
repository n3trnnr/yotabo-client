import styles from './TaskForm.module.scss'
import { ITaskForm } from "./TaskForm.props";
import { Controller, FieldValues } from 'react-hook-form';
import cn from 'classnames'
import { useState } from 'react';
import SvgIcons from '../UI/Svg/SvgIcons';
import Button from '../UI/Button/Button';

const TaskForm = <T extends FieldValues>({ control, name, files, handleDeleteFile, handleSetFiles }: ITaskForm<T>) => {

    const [over, setOver] = useState(false)
    // console.log(over);

    const minDate = () => {
        const date = new Date().toLocaleDateString()
        const [day, month, year] = date.split('.')
        return `${year}-${month}-${day}`;
    }

    const onDragover = (event: React.DragEvent) => {
        event.preventDefault();
        setOver(true)
    }

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setOver(false)
    }

    const onDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const files = [...event.dataTransfer.files];
        handleSetFiles(files)
        setOver(false)
    }

    return (
        <div className={styles['task-form']} onDragOver={onDragover}>
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

            <div className={styles['priority-block']}>
                <span>Priority</span>
                <Controller
                    control={control}
                    name={name.priority}
                    render={({ field }) => (
                        <div className={styles['radios']}>
                            <div className={styles['radio']}>
                                <input className={styles['input-radio']} {...field} type="radio" id={'low'} name={'priority'} value={'low'} defaultChecked />
                                <label className={styles['label-radio']} htmlFor={'low'} />
                                <div className={cn(styles['radio-items'], styles['radio-items__low'])}>
                                    <div className={cn(styles['dote'], styles['dote__low'])} />
                                    <span>Low</span>
                                </div>
                            </div>

                            <div className={styles['radio']}>
                                <input className={styles['input-radio']} {...field} type="radio" id={'med'} name={'priority'} value={'med'} />
                                <label className={cn(styles['label-radio'], styles['label__med'])} htmlFor={'med'} />
                                <div className={cn(styles['radio-items'], styles['radio-items__med'])}>
                                    <div className={cn(styles['dote'], styles['dote__med'])} />
                                    <span>Med</span>
                                </div>
                            </div>

                            <div className={styles['radio']}>
                                <input className={styles['input-radio']} {...field} type="radio" id={'high'} name={'priority'} value={'high'} />
                                <label className={cn(styles['label-radio'], styles['label__high'])} htmlFor={'high'} />
                                <div className={cn(styles['radio-items'], styles['radio-items__high'])}>
                                    <div className={cn(styles['dote'], styles['dote__high'])} />
                                    <span>High</span>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>

            <div className={styles['dates-block']}>
                <Controller control={control} name={name.beginTime} render={({ field }) => (
                    <label className={styles['label-date']}>
                        Begin date
                        <input type="date" min={minDate()} {...field} />
                    </label>
                )} />

                <Controller control={control} name={name.dueTime} render={({ field }) => (
                    <label className={styles['label-date']}>
                        Due date
                        <input type="date" min={minDate()} {...field} />
                    </label>
                )} />
            </div>

            {over && <div className={styles['drop-files']}
                onDragOver={onDragover}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className={styles['drop-files__inner']}>
                    <div className={styles['drop-files-title']}>
                        <SvgIcons svgIcon={'upload'} />
                        <p>Drag and Drop files here</p>
                    </div>
                </div>
            </div>}

            <div className={styles['file-block']}>
                <Controller control={control} name={name.files} render={({ field }) => (
                    <div className={styles['file-input']}>
                        <div className={styles['file-input-title']}>
                            <SvgIcons svgIcon={'upload'} />
                            <p>Drag and Drop files here or click</p>
                        </div>

                        <input type="file" id="file"
                            onChange={(event) => {
                                field.onChange(event.target.files);
                                event.target.value = '';
                            }}
                            multiple
                        />
                        <label className={styles['label-file']} htmlFor="file" />
                    </div>
                )} />

                {Boolean(files.length) && <ul className={styles['files-list']}>
                    {files.map((file) => (
                        <li key={`${file.name}_${file.size}`} className={styles['file-item']}>
                            <p>{file.name}</p>
                            <Button className={styles['button-delete']} onClick={() => handleDeleteFile(file.name)}>
                                <SvgIcons svgIcon={'trash'} />
                            </Button>
                        </li>
                    ))}
                </ul>}
            </div>

        </div>
    );
}

export default TaskForm;