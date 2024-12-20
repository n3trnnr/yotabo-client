import styles from './TaskCard.module.scss'
import SvgIcons from "../UI/Svg/SvgIcons";
import Button from "../UI/Button/Button";
import { useState } from 'react';

const TaskCard = () => {

    const [mouseIsOver, setMouseIsOver] = useState(false);

    return (
        <div className={styles["task-card"]}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <div className={styles['task-card__inner']}>

                <div className={styles['task-info']}>
                    <h3 className={styles.title}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi voluptatibus ullam quaerat repellendus quia corrupti ut atque numquam, minus, cupiditate tempore, distinctio libero quasi aut similique eum corporis fuga perspiciatis!</h3>
                    <p className={styles.description}>Lorem ipsum dolor sit amet.</p>
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

                {mouseIsOver && <Button className={styles['button-delete']}>
                    <SvgIcons svgIcon={'trash'} />
                </Button>}
            </div>
        </div>
    );
}

export default TaskCard;