import React from "react";
import Aside from "../Aside/Aside";
import MainSection from "../MainSection/MainSection";
import styles from './Layout.module.scss'
import Header from "../Header/Header";

const Layout: React.FC = () => {
    return (
        <>
            <Aside />
            <div className={styles["main-content"]}>
                <Header />
                <MainSection />
            </div>
        </>
    );
}

export default Layout;