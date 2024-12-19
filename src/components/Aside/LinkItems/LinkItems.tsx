import styles from './LinkItems.module.scss'
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { ILinkItems } from './LinkItems.props';

const LinkItems = ({ id, title, path, icon }: ILinkItems) => {
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

export default LinkItems;