import { NavLink } from "react-router-dom";
import SvgIcons from "../../UI/Svg/SvgIcons";
import styles from './ProjectNav.module.scss'
import cn from 'classnames'

const ProjectNav = () => {
    return (
        <nav className={styles['project-nav']}>
            <ul className={styles['project-nav-list']}>
                <li>
                    <NavLink
                        to={'description'}
                        className={({ isActive }) => cn(styles['nav-item'], {
                            [styles['active']]: isActive
                        })}
                    >
                        <div className={styles['icon-wrapper']}>
                            <SvgIcons svgIcon={'overview'} />
                        </div>
                        <span>Description</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'boards'}
                        className={({ isActive }) => cn(styles['nav-item'], {
                            [styles['active']]: isActive
                        })}
                    >
                        <div className={styles['icon-wrapper']}>
                            <SvgIcons svgIcon={'board'} />
                        </div>
                        <span>Boards</span>
                    </NavLink>
                </li>
            </ul>
        </nav >
    );
}

export default ProjectNav;