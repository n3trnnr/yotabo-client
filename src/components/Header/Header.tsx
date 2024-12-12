import React, { useState } from "react";
import styles from './Header.module.scss'
import HeaderNav from "./HeaderNav/HeaderNav";
import SvgIcons from "../UI/Svg/SvgIcons";
import { Link } from "react-router-dom";
import { IHeader } from "./Header.props";
// import Button from "../UI/Button/Button";



const Header = ({ children }: IHeader) => {

    const [text, setText] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <header className={styles['header']}>
            <div className={styles['header-inner']}>
                {children ?
                    <div>
                        {children}
                    </div>
                    :
                    <form onSubmit={(event) => handleSubmit(event)} className={styles["search-form"]}>
                        <div className={styles["search-button"]}>
                            <SvgIcons svgIcon={"search"} />
                        </div>
                        <input onChange={(event) => setText(event.target.value)} className={styles["input-search"]} type="text" placeholder="Search" value={text} />
                        <button onClick={() => setText('')} className={styles["close-button"]}>
                            <SvgIcons svgIcon={"close"} />
                        </button>
                    </form>
                }
                <HeaderNav />
            </div>
        </header>
    );
}

export default Header;