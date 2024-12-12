import React from "react";
import styles from './HeaderNav.module.scss'
import SvgIcons from "../../UI/Svg/SvgIcons";
import Button from "../../UI/Button/Button";

const HeaderNav: React.FC = () => {
    return (
        <nav className={styles["header-nav"]}>
            <ul className={styles["header-nav-items-list"]}>
                <li>
                    <Button buttonShape={'square'} colorStyle={'none'}>
                        <SvgIcons svgIcon={'lightTheme'} />
                    </Button>
                </li>
                <li>
                    <Button buttonShape={'square'} colorStyle={'none'}>
                        <SvgIcons svgIcon={'notification'} />
                    </Button>
                </li>
                <li>
                    <Button buttonShape={'square'} colorStyle={'none'}>
                        some icon
                    </Button>
                </li>
            </ul>
        </nav>
    );
}

export default HeaderNav;