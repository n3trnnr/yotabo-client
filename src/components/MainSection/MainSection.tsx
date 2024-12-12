import React from "react";
import styles from './MainSection.module.scss'
import { Outlet } from "react-router-dom";

const MainSection: React.FC = () => {
    return (
        <section className={styles['main-section']}>
            <Outlet />
        </section>
    );
}

export default MainSection;