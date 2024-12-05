import React, { useState } from "react";
import styles from './GlobalHeader.module.scss'
import Nav from "./Navigation/Nav";
import SvgIcons from "../UI/Svg/SvgIcons";
import { Link, useLocation } from "react-router-dom";
import { IGlobalHeader } from "./GlobalHeader.props";



const GlobalHeader = ({ children }: IGlobalHeader) => {

    const [text, setText] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const location = useLocation()
    // console.log('location', location);

    return (
        <header className={styles['header']}>
            <div className={styles["logo-container"]}>
                <Link to={'/'} className={styles["logo-wrapper"]}>
                    <SvgIcons iconName={'logo'} styleName={styles['logo-icon']} />
                    <h1>Yotabo</h1>
                </Link>
            </div>
            {
                children ?
                    <div>
                        {children}
                    </div>
                    :
                    <form onSubmit={(event) => handleSubmit(event)} className={styles["search-form"]}>
                        <button className={styles["search-button"]}>
                            <SvgIcons iconName={"search"} />
                        </button>
                        <input onChange={(event) => setText(event.target.value)} className={styles["input-search"]} type="text" placeholder="Search" value={text} />
                        <button onClick={() => setText('')} className={styles["close-button"]}>
                            <SvgIcons iconName={"cross"} />
                        </button>
                    </form>
            }
            <Nav />
        </header>
    );
}

export default GlobalHeader;