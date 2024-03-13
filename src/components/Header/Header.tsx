import React from "react";
import styles from './Header.module.scss'
import Nav from "./Navigation/Nav";

interface IHeader {
    children: React.ReactNode,
}

const Header = ({ children }: IHeader) => {

    return (
        <header className={styles.header}>
            {
                children ?
                    <div>
                        {children}
                    </div>
                    :
                    <form className={styles["search-form"]} action="">
                        <input className={styles["input-search"]} type="text" placeholder="Search" />
                        <button className={styles["btn-send-search-form"]}>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.7153 13.9457C9.64153 16.4073 5.14231 16.2134 2.293 13.3642C-0.764332 10.3069 -0.764332 5.35017 2.29299 2.29293C5.35032 -0.76431 10.3072 -0.76431 13.3646 2.29293C16.2141 5.14237 16.4078 9.6419 13.9456 12.7157L20.7452 19.5151C21.0849 19.8548 21.0849 20.4055 20.7452 20.7452C20.4055 21.0849 19.8547 21.0849 19.515 20.7452L12.7153 13.9457ZM12.1251 12.1433C12.128 12.1403 12.131 12.1373 12.134 12.1343C12.137 12.1312 12.1401 12.1282 12.1431 12.1253C14.5123 9.74673 14.5094 5.898 12.1344 3.52307C9.75646 1.14522 5.90109 1.14521 3.52317 3.52307C1.14525 5.90092 1.14525 9.75618 3.52317 12.134C5.898 14.5088 9.74644 14.5119 12.1251 12.1433Z" fill="#464646" />
                            </svg>
                        </button>
                    </form>
            }
            <Nav />
        </header>
    );
}

export default Header;