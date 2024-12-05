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
        // event.stopPropagation()
        dispatch(deleteProject(id))
    }

    return (
        <>
            {(status || error) && <ModalAction status={status} error={error} />}

            {showModal &&
                <div className={styles["modal-window"]}>
                    <ModalWindow type={"simple"} modalWindowTitle={"Create project"} handleShowModal={handleShowModal} />
                </div>
            }

            <MainComponentHeader type={'none'}>
                <Button buttonShape={'square'} colorStyle={'light-grey'} margin={'10px'}>
                    <SvgIcons iconName={'boardView'} />
                </Button>
                <Button buttonShape={'square'} colorStyle={'light-grey'} margin={'10px'}>
                    <SvgIcons iconName={'listView'} />
                </Button>
                <Button buttonShape={'rectangle'} colorStyle={'light-grey'} title={'Filter'} margin={'10px'}>
                    <SvgIcons iconName={'filter'} />
                </Button>
                <Button handleClick={() => handleShowModal(true)} buttonShape={'rectangle'} colorStyle={'blue'} title={'New project'} margin={'10px'}>
                    <SvgIcons iconName={'addNewElement'} />
                </Button>
            </MainComponentHeader>

            <div className={styles['projects-list-container']}>
                <div className={styles['projects-list-wrapper']}>

                    {projects && projects?.data.map((project) => (
                        // <Link to={`/projects/${project.id}/boards`} key={project.id}>
                        <ProjectCard key={project.id} projectData={project} deleteProject={handleDeleteProject} />
                        // </Link>
                    ))}

                </div>
            </div>
        </>
    );
}

export default ProjectsPage;