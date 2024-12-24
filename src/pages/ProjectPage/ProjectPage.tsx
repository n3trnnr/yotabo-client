import { ChangeEvent, useEffect, useState } from 'react';
import styles from './ProjectPage.module.scss'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { deleteProject, editProject } from '../../store/slices/projectsSlice';
import ProjectNav from '../../components/ProjectNav/ProjectNav';
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import cn from 'classnames'
import AdaptiveInput from '../../components/UI/AdaptiveInput/AdaptiveInput';

const ProjectPage = () => {
    const [title, setTitle] = useState('')
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const project = useAppSelector((state) => {
        if (state.projects.projects && id) {
            return state.projects.projects.data.find(project => project.documentId === id)
        }
    })

    useEffect(() => {
        if (project) {
            setTitle(project.title)
        }
    }, [project])

    const hadnleDeleteProject = () => {
        if (id) {
            dispatch(deleteProject(id))
            navigate('/home')
        }
    }

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title)
    }

    const handleEditProject = () => {
        if (project && id && title !== project.title) {
            dispatch(editProject({ field: 'title', value: title, projectId: id }))
        }
        return;
    }

    const toggleFavoriteProject = () => {
        if (project && id) {
            dispatch(editProject({ field: 'isFavorite', value: !project.isFavorite, projectId: id }))
        }
    }

    return (
        <div className={styles['project']}>
            <div className={styles['project__inner']}>

                <div className={styles['info-bar']}>
                    <div className={styles['info-bar__inner']}>

                        <AdaptiveInput
                            className={styles['title-input']}
                            type="text"
                            onBlur={handleEditProject}
                            onChange={handleChangeTitle}
                            inputValue={title}
                        />

                        <Button onClick={toggleFavoriteProject} className={cn(styles['button'], {
                            [styles['button-favorite']]: !project?.isFavorite,
                            [styles['button-favorite__active']]: project?.isFavorite
                        })}>
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