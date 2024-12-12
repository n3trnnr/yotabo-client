import React from "react";
import styles from './Aside.module.scss'
import Sidebar from "./Sidebar/Sidebar";
import { Link } from "react-router-dom";
import SvgIcons from "../UI/Svg/SvgIcons";

const Aside: React.FC = () => {
    return (
        <aside className={styles.aside}>

            <div className={styles["logo-container"]}>
                <Link to={'/'} className={styles["logo-wrapper"]}>
                    <SvgIcons svgIcon={'logo'} className={styles['logo-icon']} />
                    <h1>Yotabo</h1>
                </Link>
            </div>

            <Sidebar />
        </aside>
    );
}

export default Aside;

