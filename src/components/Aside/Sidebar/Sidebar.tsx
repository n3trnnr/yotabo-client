import styles from './Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore.ts";
import { userActions } from "../../../store/slices/userSlice.ts";
import Button from '../../UI/Button/Button.tsx';
import SvgIcons from '../../UI/Svg/SvgIcons.tsx';
import { SidebarLinkItemsData } from '../SidebarLinkItems/SidebarLinkItemsData.tsx';
import SidebarLinkItems from '../SidebarLinkItems/SidebarLinkItems.tsx';
import DynamicSidebarItems from '../DynamicSidebarItems/DynamicSidebarItems.tsx';
import { useEffect, useState } from 'react';
import { getProjectsData } from '../../../store/slices/projectSlice.ts';
import { hex } from '../../../helpers/hex.ts';

const Sidebar = () => {
    const dispatch = useAppDispatch()
    const projects = useAppSelector((state) => state.project.projects)
    const [substring, setSubstring] = useState('')

    useEffect(() => {
        dispatch(getProjectsData())
    }, [])

    return (
        <nav className={styles["sidebar"]}>
            <div className={styles['sidebar__inner']}>

                <ul className={styles['items-list']}>
                    {SidebarLinkItemsData.map((item) => (
                        <SidebarLinkItems
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            path={item.path}
                            icon={item.icon}
                        />
                    ))}
                </ul>
                <hr className={styles['separator']} />

                <DynamicSidebarItems
                    iconBefore={<SvgIcons svgIcon={'projects'} />}
                    iconAfter={<SvgIcons svgIcon={'arrowDown'} />}
                    title={'Projects'}
                    setSubstring={setSubstring}
                >
                    <ul className={styles['items-list']}>
                        {projects?.data.map((project) => (
                            <SidebarLinkItems
                                key={project.id}
                                id={project.id}
                                title={project.attributes.title}
                                path={`projects/${project.id}`}
                                icon={<div className={styles['project-icon']} style={{ background: `${hex()}` }} />}
                            />
                        ))}
                    </ul>
                </DynamicSidebarItems>

                <Button aria-controls='' className={styles['exit']} onClick={() => dispatch(userActions.logOut())} title={'Log out'}>
                    <SvgIcons svgIcon={'exit'} />
                </Button>

            </div>
        </nav>
    );
}

export default Sidebar;