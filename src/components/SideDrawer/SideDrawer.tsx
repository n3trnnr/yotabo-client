import { useState } from 'react';
import { useSideDrawer } from '../../hoc/Contexts/SideDrawer/SideDrawerProvider';
import styles from './SideDrawer.module.scss'
import cn from 'classnames'
import { useForm } from 'react-hook-form';
import { TSideDrawer } from './TSideDrawer';
import TaskForm from '../TaskForm/TaskForm';

const SideDrawer = () => {
    const { isOpen } = useSideDrawer();

    const [files, setFiles] = useState<File[]>([])

    const getDefaultValues = () => {
        return {
            title: '',
            description: '',
            priority: 'low',
            dueTime: '',
            beginTime: '',
            files: undefined
        }
    }

    const { control, handleSubmit, watch, reset, } = useForm<TSideDrawer>({
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            priority: 'low',
            dueTime: '',
            beginTime: '',
            files: undefined
        }
    })

    const closeSideDrawer = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

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

    return (
        <div className={cn(styles['side-drawer'], {
            [styles['side-drawer__open']]: isOpen,
            [styles['side-drawer__close']]: !isOpen
        })}
            onClick={closeSideDrawer}
        >
            <div className={styles['side-drawer__inner']}>
                <TaskForm
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
                    }} />
            </div>
        </div>
    );
}

export default SideDrawer;