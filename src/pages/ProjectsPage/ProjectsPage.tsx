import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainComponentHeader from '../../components/MainComponentHeader/MainComponentHeader'
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './ProjectsPage.module.scss'
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { deleteProject, getProjectsData } from '../../store/slices/projectSlice';
import { TId } from '../../interfaces/global';
import ModalAction from '../../components/ModalAction/ModalAction';

const ProjectsPage = () => {
    const dispatch = useAppDispatch()
    const { projects, status, error } = useAppSelector((state) => state.project)
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getProjectsData())
    }, [dispatch])

    const handleShowModal = (isShown: boolean) => {
        setShowModal(isShown)
    }

    const handleDeleteProject = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: TId) => {
        event.preventDefault()
        dispatch(deleteProject(id))
    }

    const handleEditProject = ({ title, description }: { title: string, description: string }) => {
        dispatch;
        title
        description
    }

    return (
        <>
            {(status || error) && <ModalAction status={status} error={error} />}


            {/* <div className={styles["modal-window"]}>
                <ModalWindow type={"simple"} modalWindowTitle={"Create project"} />
            </div> */}


            <MainComponentHeader type={'none'}>
                <Button className={styles['squre-button']}>
                    <SvgIcons svgIcon={'board'} />
                </Button>
                <Button className={styles['squre-button']}>
                    <SvgIcons svgIcon={'list'} />
                </Button>
                <Button className={styles['fiter-button']} childrenAfter={<SvgIcons svgIcon='arrowDown' />} title={'Filter'}>
                    <SvgIcons svgIcon={'filter'} />
                </Button>
                <Button handleClick={() => handleShowModal(true)} className={styles['add-button']} title={'New project'}>
                    <SvgIcons svgIcon={'add'} />
                </Button>
            </MainComponentHeader>

            <div className={styles['projects-list-container']}>
                <div className={styles['projects-list-wrapper']}>

                    {projects && projects?.data.map((project) => (
                        <Link to={`/projects/${project.id}/boards`} key={project.id}>
                            <ProjectCard key={project.id} projectData={project} deleteProject={handleDeleteProject} />
                        </Link>
                    ))}

                </div>
            </div>
        </>
    );
}

export default ProjectsPage;