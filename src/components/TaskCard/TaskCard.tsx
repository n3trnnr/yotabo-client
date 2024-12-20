import styles from './TaskCard.module.scss'
import SvgIcons from "../UI/Svg/SvgIcons";
import Button from "../UI/Button/Button";

const TaskCard = () => {
    return (
        <div className={styles["task-card"]}>
            <div className={styles['task-card__inner']}>

                <div className={styles['task-info']}>
                    <h3 className={styles.title}>Frontend</h3>
                    <p className={styles.description}>Разработать UI/UX kit, для прототипа нового приложения...</p>
                </div>

                <div className={styles["info-bar"]}>
                    <div className={styles['info-bar__item']}>
                        <div className={styles["priority-high"]}></div>
                        <span>High</span>
                    </div>
                    <div className={styles['info-bar__item']}>
                        <SvgIcons svgIcon={"inProgress"} className={styles["deadline-icon"]} />
                        <span>Dec 24</span>
                    </div>
                    <div className={styles['info-bar__item']}>
                        <SvgIcons svgIcon={"file"} className={styles["files-icon"]} />
                        <span>0</span>
                    </div>
                </div>

                <Button className={styles['button-delete']}>
                    <SvgIcons svgIcon={'trash'} />
                </Button>
            </div>
        </div>
    );
}

export default TaskCard;