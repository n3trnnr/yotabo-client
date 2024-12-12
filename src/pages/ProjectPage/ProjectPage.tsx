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
    // console.log('location', location);

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const project = useAppSelector((state) => state.project.project)
    // console.log('project', project);


    useEffect(() => {
        if (id) {
            dispatch(getProjectDataById(id))
        }
    }, [])

    const [showModal, setShowModal] = useState<boolean>(false)
    const handleShowModal = (isShown: boolean) => {
        setShowModal(isShown)
    }

    return (
        <>
            {showModal &&
                <div className={styles["modal-window"]}>
                    <ModalWindow type={"advanced"} modalWindowTitle={"Create task"} handleShowModal={handleShowModal} />
                </div>
            }

            <MainComponentHeader
                type={'info'}
                progressPercentage={project?.data.attributes.progress}
            >
                {location.pathname.endsWith('boards') && <>
                    <Button buttonShape={'square'} colorStyle={'light-grey'}>
                        <SvgIcons svgIcon={'board'} />
                    </Button>
                    <Button buttonShape={'square'} colorStyle={'light-grey'}>
                        <SvgIcons svgIcon={'list'} />
                    </Button>
                    <Button buttonShape={'rectangle'} colorStyle={'light-grey'} title={'Filter'}>
                        <SvgIcons svgIcon={'filter'} />
                    </Button>
                    <Button handleClick={() => handleShowModal(true)} buttonShape={'rectangle'} colorStyle={'blue'} title={'New task'}>
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