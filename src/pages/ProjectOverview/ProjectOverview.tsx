import styles from './ProjectOverview.module.scss'
import { useOutletContext } from "react-router-dom";
import { IProjectData } from '../../interfaces/store/projectSlice';
import { useAppDispatch } from '../../hooks/useStore';
import { ChangeEvent, useEffect, useState } from 'react';
import { editProject } from '../../store/slices/projectSlice';

const ProjectOverview = () => {
    const [description, setDescription] = useState('')

    const project = useOutletContext<IProjectData | null>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (project) {
            setDescription(project.attributes.description)
        }
    }, [project])

    const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    const handleEditProject = () => {
        if (project?.id && description !== project.attributes.description) {
            dispatch(editProject({ field: 'description', value: description, projectId: project.id }))
        }
        return;
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
                            value={description}
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