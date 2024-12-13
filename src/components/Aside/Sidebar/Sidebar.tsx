import styles from './Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore.ts";
import { userActions } from "../../../store/slices/userSlice.ts";
import Button from '../../UI/Button/Button.tsx';
import SvgIcons from '../../UI/Svg/SvgIcons.tsx';
import StaticSidebarItems from '../StaticSidebarItems/StaticSidebarItems.tsx';
import DynamicSidebarItems from '../DynamicSidebarItems/DynamicSidebarItems.tsx';

const Sidebar = () => {
    const projects = useAppSelector((state) => state.project.projects)
    const dispatch = useAppDispatch()

    return (
        <nav className={styles["sidebar"]}>
            <div className={styles['sidebar__inner']}>
                <StaticSidebarItems />
                <div className={styles['separator']} />
                <DynamicSidebarItems projects={projects || null} />
                <Button className={styles['exit']} onClick={() => dispatch(userActions.logOut())} title={'Log out'}>
                    <SvgIcons svgIcon={'exit'} />
                </Button>

            </div>
        </nav>
    );
}

export default Sidebar;