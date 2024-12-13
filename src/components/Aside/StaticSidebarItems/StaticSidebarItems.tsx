import styles from './StaticSidebarItems.module.scss'
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { IStaticSidebarItems } from './StaticSidebarItems.props';
import { StaticSidebarData } from './StaticSidebarData';

const StaticSidebarItems = ({ }: IStaticSidebarItems) => {
    return (
        <ul className={styles['items-list']}>
            {StaticSidebarData.map((item) => (
                <li key={item.key} className={styles['item']}>
                    <NavLink to={item.path}
                        className={({ isActive }) => cn(styles['item__inner'], { [styles['item__inner__active']]: isActive })}
                    >
                        {item.svgIcon}
                        <span>{item.title}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default StaticSidebarItems;