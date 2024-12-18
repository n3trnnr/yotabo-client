import React from "react";
import styles from './Aside.module.scss'
import Sidebar from "./Sidebar/Sidebar";
import { Link } from "react-router-dom";
import SvgIcons from "../UI/Svg/SvgIcons";
import Button from "../UI/Button/Button";

const Aside: React.FC = () => {
    return (
        <aside className={styles['aside']}>
            <section className={styles['aside__inner']}>

                <header className={styles['aside__header']}>
                    <Link to={'/'} className={styles['logo']}>
                        <SvgIcons svgIcon={'logo'} className={styles['icon']} />
                        <h1 className={styles['headling']}>Yotabo</h1>
                    </Link>

                    <Button className={styles['burger-menu']}>
                        <SvgIcons svgIcon={'arrowLeft'} />
                    </Button>
                </header>

                <Sidebar />
            </section>
        </aside>
    );
}

export default Aside;

