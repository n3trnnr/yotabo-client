import { useEffect, useState } from 'react';
import styles from './ProjectPage.module.scss'
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { getProjectDataById } from '../../store/slices/projectSlice';
import ProjectNav from '../../components/ProjectNav/ProjectNav';
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';

const ProjectPage = () => {
    const [editMode, setEditMode] = useState(false)

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const project = useAppSelector((state) => state.project.project)

    useEffect(() => {
        if (id) {
            dispatch(getProjectDataById(id))
        }
    }, [id])

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
                                onBlur={() => setEditMode(false)}
                                value={project?.data.attributes.title}
                            />
                            : <h2
                                onDoubleClick={() => setEditMode(true)}
                                className={styles['title']}
                            >
                                {project?.data.attributes.title}
                            </h2>
                        }
                        <Button className={styles['button-favourites']}>
                            <SvgIcons svgIcon={'bookmark'} />
                        </Button>
                    </div>

                    <ProjectNav />
                </div>

                <Outlet />
            </div>
        </div>
    );
}

export default ProjectPage;