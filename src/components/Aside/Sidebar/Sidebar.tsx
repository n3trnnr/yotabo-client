import styles from './Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore.ts";
import { userActions } from "../../../store/slices/userSlice.ts";
import Button from '../../UI/Button/Button.tsx';
import SvgIcons from '../../UI/Svg/SvgIcons.tsx';
import { LinkItemsData } from '../LinkItems/LinkItemsData.tsx';
import LinkItems from '../LinkItems/LinkItems.tsx';
import DropDownItems from '../DropDownItems/DropDownItems.tsx';
import { useEffect, useState } from 'react';
import { getProjectsData } from '../../../store/slices/projectSlice.ts';
import { hex } from '../../../helpers/hex.ts';
import Filter from '../../UI/Filter/Filter.tsx';
import { useModal } from '../../../hoc/Contexts/ModalWindow/ModalProvider.tsx';

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector((state) => state.project.projects);
    const [substring, setSubstring] = useState('');
    const { handleOpenModal } = useModal();

    useEffect(() => {
        dispatch(getProjectsData())
    }, [])

    return (
        <div className={styles["sidebar"]}>
            <div className={styles['sidebar__inner']}>

                <nav className={styles['nav']}>

                    <div className={styles['link-items']}>
                        <ul className={styles['items-list']}>
                            {LinkItemsData.map((item) => (
                                <LinkItems
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    path={item.path}
                                    icon={item.icon}
                                />
                            ))}
                        </ul>
                    </div>

                    <hr className={styles['separator']} />

                    <div className={styles['drop-down-items']}>
                        <div className={styles['drop-down-items__inner']}>
                            <DropDownItems
                                icon1={<SvgIcons svgIcon={'projects'} />}
                                icon2={<SvgIcons svgIcon={'arrowDown'} />}
                                title={'Project'}
                                settings={<Filter />}
                                handleClick={handleOpenModal}
                            >
                                <ul className={styles['items-list']}>
                                    {projects?.data.map((project) => (
                                        <LinkItems
                                            key={project.id}
                                            id={project.id}
                                            title={project.attributes.title}
                                            path={`projects/${project.id}`}
                                            icon={<div className={styles['project-icon']} style={{ background: `${hex()}` }} />}
                                        />
                                    ))}
                                </ul>
                            </DropDownItems>

                            <DropDownItems
                                icon1={<SvgIcons svgIcon={'projects'} />}
                                icon2={<SvgIcons svgIcon={'arrowDown'} />}
                                title={'Project'}
                                settings={<Filter />}
                                handleClick={handleOpenModal}
                            >
                                <ul className={styles['items-list']}>
                                    {projects?.data.map((project) => (
                                        <LinkItems
                                            key={project.id}
                                            id={project.id}
                                            title={project.attributes.title}
                                            path={`projects/${project.id}`}
                                            icon={<div className={styles['project-icon']} style={{ background: `${hex()}` }} />}
                                        />
                                    ))}
                                </ul>
                            </DropDownItems>
                            <DropDownItems
                                icon1={<SvgIcons svgIcon={'projects'} />}
                                icon2={<SvgIcons svgIcon={'arrowDown'} />}
                                title={'Project'}
                                settings={<Filter />}
                                handleClick={handleOpenModal}
                            >
                                <ul className={styles['items-list']}>
                                    {projects?.data.map((project) => (
                                        <LinkItems
                                            key={project.id}
                                            id={project.id}
                                            title={project.attributes.title}
                                            path={`projects/${project.id}`}
                                            icon={<div className={styles['project-icon']} style={{ background: `${hex()}` }} />}
                                        />
                                    ))}
                                </ul>
                            </DropDownItems>
                            <DropDownItems
                                icon1={<SvgIcons svgIcon={'projects'} />}
                                icon2={<SvgIcons svgIcon={'arrowDown'} />}
                                title={'Project'}
                                settings={<Filter />}
                                handleClick={handleOpenModal}
                            >
                                <ul className={styles['items-list']}>
                                    {projects?.data.map((project) => (
                                        <LinkItems
                                            key={project.id}
                                            id={project.id}
                                            title={project.attributes.title}
                                            path={`projects/${project.id}`}
                                            icon={<div className={styles['project-icon']} style={{ background: `${hex()}` }} />}
                                        />
                                    ))}
                                </ul>
                            </DropDownItems>
                        </div>

                    </div>

                </nav>

                <Button aria-controls='' className={styles['exit']} onClick={() => dispatch(userActions.logOut())} title={'Log out'}>
                    <SvgIcons svgIcon={'exit'} />
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;