import React, { ReactNode } from "react";
import styles from './Sidebar.module.scss'
import { SidebarData } from './SidebarData.tsx'
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useStore.ts";
import { userActions } from "../../../store/slices/userSlice.ts";

interface ISidebarData {
    key: string;
    title: string;
    path: string;
    icon: (styleName: string) => ReactNode;
}

const Sidebar: React.FC = () => {

    const dispatch = useAppDispatch()

    return (
        <nav className={styles["aside-nav-wrapper"]}>
            <ul className={styles["main-nav-list"]}>
                {SidebarData.map((item: ISidebarData) => (
                    item.title !== 'Log out' &&
                    <li key={item.key} className={styles["item-wrapper"]}>
                        <Link to={item.path}>
                            <div className={styles["nav-item"]}>
                                {item.icon(styles['aside-nav-icon'])}
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className={styles["nav-item-logout"]}>
                {SidebarData.map((item: ISidebarData) => (
                    item.title === 'Log out' &&
                    <li
                        onClick={() => dispatch(userActions.logOut())}
                        key={item.key}
                        className={styles["item-wrapper"]}>
                        <div>
                            <div className={styles["nav-item"]}>
                                {item.icon(styles['aside-nav-icon'])}
                                <span >{item.title}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;