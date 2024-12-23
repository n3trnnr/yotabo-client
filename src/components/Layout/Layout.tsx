import React from "react";
import Aside from "../Aside/Aside";
import MainSection from "../MainSection/MainSection";
import styles from './Layout.module.scss'
import Header from "../Header/Header";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useModal } from "../../hoc/Contexts/ModalWindow/ModalProvider";

const Layout: React.FC = () => {

    const { modalParams } = useModal();

    return (
        <>
            {modalParams !== null && <ModalWindow type={modalParams.type} title={modalParams.title} />}
            <Aside />
            <div className={styles["main-content"]}>
                <Header />
                <MainSection />
            </div>
        </>
    );
}

export default Layout;