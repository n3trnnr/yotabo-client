import styles from './SidebarLinkItems.module.scss'
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { ISidebarLinkItems } from './SidebarLinkItems.props';

const SidebarLinkItems = ({ id, title, path, icon }: ISidebarLinkItems) => {
    console.log('path', path);

    return (
        <li key={id} className={styles['item']}>
            <NavLink to={path}
                className={({ isActive }) => cn(styles['item__inner'], { [styles['item__inner__active']]: isActive })}
            >
                {icon}
                <span>{title}</span>
            </NavLink>
        </li>
    );
}

export default SidebarLinkItems;