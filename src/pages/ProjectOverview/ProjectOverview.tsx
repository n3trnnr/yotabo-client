import styles from './ProjectOverview.module.scss'
import { useOutletContext } from "react-router-dom";
import { IProjectData } from '../../interfaces/store/projectSlice';
import { useAppDispatch } from '../../hooks/useStore';
import { ChangeEvent, useEffect, useState } from 'react';
import { editProject } from '../../store/slices/projectSlice';

const ProjectOverview = () => {
    const [title, setTitle] = useState('')

    const project = useOutletContext<IProjectData | null>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (project) {
            setTitle(project.attributes.description)
        }
    }, [project])

    const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }

    const handleEditProject = () => {
        if (project?.id) {
            dispatch(editProject({ field: 'description', value: title, projectId: project.id }))
        }
    }

    return (
        <div className={styles["overview"]}>
            <div className={styles['overview__inner']}>
                {project && <>
                    <div className={styles['project-description']}>
                        <span className={styles['description-title']}>Project description</span>
                        <textarea
                            onBlur={handleEditProject}
                            onChange={handleChangeTitle}
                            className={styles['textarea']}
                            defaultValue={title}
                            placeholder={"What's this project about?"}
                        />
                    </div>

                    <div className={styles['project-info']}>

                        <div className={styles['user']}>
                            <div>Project owner</div>
                            <div className={styles['user__inner']}>
                                <div className={styles['avatar']}></div>

                                <div className={styles['info']}>
                                    <div className={styles['name']}>{''}</div>
                                    <div className={styles['email']}>{''}</div>
                                </div>
                            </div>
                        </div>


                        <div className={styles['project-dates']}>
                            <div>Creation date</div>
                            <div>{new Date(project.attributes.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                </>}

            </div>
        </div>
    );
}

export default ProjectOverview;