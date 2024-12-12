import React from "react";
import styles from './TaskCard.module.scss'
import SvgIcons from "../UI/Svg/SvgIcons";
import Button from "../UI/Button/Button";

//Изменить цвет шрифта на светло серый в описании и в инфо баре!

const TaskCard: React.FC = () => {
    return (
        <>
            <li className={styles["task-card-container"]}>
                {/* <img className={styles.cover} src="" alt="cover" /> */}
                <div className={styles["task-card-wrapper"]}>
                    <h3 className={styles.title}>Frontend</h3>
                    <p className={styles.description}>Разработать UI/UX kit, для прототипа нового приложения...</p>
                    <div className={styles["info-bar"]}>
                        <div className={styles.priority}>
                            <div className={styles["priority-high"]}></div>
                            <span>High</span>
                        </div>
                        <div className={styles.deadline}>
                            <SvgIcons svgIcon={"inProgress"} className={styles["deadline-icon"]} />
                            <span>Dec 24</span>
                        </div>
                        <div className={styles.files}>
                            <SvgIcons svgIcon={"file"} className={styles["files-icon"]} />
                            <span>0</span>
                        </div>
                        <span className={styles['burger-menu']}>
                            <Button colorStyle={'none'}>
                                some icon
                            </Button>
                        </span>
                    </div>
                </div>
            </li>
        </>
    );
}

export default TaskCard;