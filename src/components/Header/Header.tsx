import React, { useState } from "react";
import styles from './Header.module.scss'
import HeaderBar from "./HeaderBar/HeaderBar";
import SvgIcons from "../UI/Svg/SvgIcons";
import Button from "../UI/Button/Button";
import { useAppSelector } from "../../hooks/useStore";

const Header = () => {
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const [text, setText] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const handleResetForm = () => {
        setText('')
    }

    return (
        <header className={styles['header']}>
            <div className={styles['header__inner']}>
                <form onSubmit={(event) => handleSubmit(event)} className={styles["search-form"]}>
                    <div className={styles["search-icon"]}>
                        <SvgIcons svgIcon={"search"} />
                    </div>

                    <input
                        onChange={(event) => setText(event.target.value)}
                        className={styles["input"]}
                        type="text"
                        placeholder="Search"
                        value={text}
                    />

                    <Button handleClick={handleResetForm} className={styles["button"]}>
                        <SvgIcons svgIcon={"close"} />
                    </Button>
                </form>
                <HeaderBar userData={currentUser ? currentUser : null} />
            </div>
        </header>
    );
}

export default Header;