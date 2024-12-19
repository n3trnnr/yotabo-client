import React from "react";
import Aside from "../Aside/Aside";
import MainSection from "../MainSection/MainSection";
import styles from './Layout.module.scss'
import Header from "../Header/Header";
import ModalWindow from "../ModalWindow/ModalWindow";

const Layout: React.FC = () => {
    return (
        <>
            <ModalWindow type={'simple'} title="Create project" />
            <Aside />
            <div className={styles["main-content"]}>
                <Header />
                <MainSection />
            </div>
        </>
    );
}

export default Layout;