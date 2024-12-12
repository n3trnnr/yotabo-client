import styles from './HeaderBar.module.scss'
import SvgIcons from "../../UI/Svg/SvgIcons";
import Button from "../../UI/Button/Button";
import { IHeaderBar } from "./HeaderBar.props";

const HeaderBar = ({ userData }: IHeaderBar) => {
    return (
        <div className={styles['header-bar']}>
            <div className={styles['header-bar__inner']}>
                <div className={styles["items-list"]}>

                    <Button className={styles['button']}>
                        <SvgIcons svgIcon={'lightTheme'} />
                    </Button>

                    <Button className={styles['button']}>
                        <SvgIcons svgIcon={'notification'} />
                    </Button>

                    <div className={styles['separator']} />

                    <div className={styles['user']}>
                        <div className={styles['user__inner']}>
                            <div className={styles['avatar']}></div>

                            <div className={styles['info']}>
                                <div className={styles['name']}>{userData?.username || ''}</div>
                                <div className={styles['email']}>{userData?.email || ''}</div>
                            </div>

                            <Button className={styles['button']}>
                                <SvgIcons svgIcon={'arrowDown'} />
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderBar;