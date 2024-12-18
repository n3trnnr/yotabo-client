import { useEffect, useState } from 'react';
import MainComponentHeader from '../../components/MainComponentHeader/MainComponentHeader';
import styles from './ProjectPage.module.scss'
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { getProjectDataById } from '../../store/slices/projectSlice';
import ProjectBoardsPage from '../ProjectBoardsPage/ProjectBoardsPage';
import ProjectDescriptionPage from '../ProjectDescriptionPage/ProjectDescriptionPage';

const ProjectPage = () => {
    const location = useLocation()

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const project = useAppSelector((state) => state.project.project)



    useEffect(() => {
        if (id) {
            dispatch(getProjectDataById(id))
        }
    }, [id])

    const [showModal, setShowModal] = useState<boolean>(false)
    const handleShowModal = (isShown: boolean) => {
        setShowModal(isShown)
    }

    return (
        <>

            {/* <div className={styles["modal-window"]}>
                <ModalWindow type={"advanced"} modalWindowTitle={"Create task"} />
            </div> */}


            <MainComponentHeader
                type={'info'}
                progressPercentage={project?.data.attributes.progress}
            >
                {location.pathname.endsWith('boards') && <>
                    <Button className={styles['']}>
                        <SvgIcons svgIcon={'board'} />
                    </Button>
                    <Button className={styles['']}>
                        <SvgIcons svgIcon={'list'} />
                    </Button>
                    <Button className={styles['']} title={'Filter'}>
                        <SvgIcons svgIcon={'filter'} />
                    </Button>
                    <Button handleClick={() => handleShowModal(true)} className={styles['']} title={'New task'}>
                        <SvgIcons svgIcon={'add'} />
                    </Button>
                </>}
            </MainComponentHeader>

            {/* <Outlet /> */}
            {location.pathname.endsWith('boards') ? <ProjectBoardsPage /> : <ProjectDescriptionPage project={project?.data} />}

        </>
    );
}

export default ProjectPage;