import { ChangeEvent, useState } from 'react';
import styles from './ProjectPage.module.scss'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { deleteProject, editProject } from '../../store/slices/projectSlice';
import ProjectNav from '../../components/ProjectNav/ProjectNav';
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import cn from 'classnames'

const ProjectPage = () => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const project = useAppSelector((state) => {
        if (state.project.projects && id) {
            return state.project.projects.data.find(project => project.id === +id)
        }
    })

    const hadnleDeleteProject = () => {
        if (id) {
            dispatch(deleteProject(id))
            navigate('/home')
        }
    }

    const handleDoubleClick = () => {
        if (project) {
            setTitle(project.attributes.title)
            setEditMode(true)
        }
    }

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleEditProject = () => {
        setEditMode(false)

        if (id) {
            dispatch(editProject({ field: 'title', value: title, projectId: id }))
        }
    }

    return (
        <div className={styles['project']}>
            <div className={styles['project__inner']}>

                <div className={styles['info-bar']}>
                    <div className={styles['info-bar__inner']}>
                        {editMode
                            ? <input
                                autoFocus
                                className={styles['title-input']}
                                type="text"
                                onBlur={handleEditProject}
                                onChange={handleChangeTitle}
                                value={title}
                            />
                            : <h2
                                onDoubleClick={handleDoubleClick}
                                className={styles['title']}
                            >
                                {project?.attributes.title}
                            </h2>
                        }
                        <Button className={cn(styles['button'], styles['button-favourites'])}>
                            <SvgIcons svgIcon={'bookmark'} />
                        </Button>

                        <Button onClick={hadnleDeleteProject} className={cn(styles['button'], styles['button-delete'])}>
                            <SvgIcons svgIcon={'trash'} />
                        </Button>
                    </div>

                    <ProjectNav />
                </div>

                <Outlet context={project} />
            </div>
        </div>
    );
}

export default ProjectPage;