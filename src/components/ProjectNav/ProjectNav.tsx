import { NavLink } from "react-router-dom";
import styles from './ProjectNav.module.scss'
import cn from 'classnames'
import { ProjectNavData } from "./ProjectNavData";

const ProjectNav = () => {
    return (
        <nav className={styles['project-nav']}>
            <ul className={styles['nav-items-list']}>
                {ProjectNavData.map((project) => (
                    <li key={project.id} className={styles['nav-item']}>
                        <NavLink
                            to={project.path}
                            className={({ isActive }) => cn(styles['link-item'], {
                                [styles['active']]: isActive
                            })}
                        >
                            <div className={styles['content']}>
                                {project.icon}
                                <span>{project.title}</span>
                            </div>
                            <div className={styles['border']} />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav >
    );
}

export default ProjectNav;