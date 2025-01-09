import styles from './TaskCard.module.scss'
import SvgIcons from "../UI/Svg/SvgIcons";
import Button from "../UI/Button/Button";
import { useState } from 'react';
import { ITaskProps } from './TaskCard.props';

const TaskCard = ({ task, handleDeleteTask }: ITaskProps) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    return (
        <div className={styles["task-card"]}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <div className={styles['task-card__inner']}>

                <div className={styles['task-info']}>
                    <h3 className={styles.title}>{task.title}</h3>
                    <p className={styles.description}>{task.description}.</p>
                </div>

                <div className={styles["info-bar"]}>
                    <div className={styles['info-bar__item']}>
                        <div className={styles[`priority-${task.priority}`]} />
                        <span>{task.priority}</span>
                    </div>
                    <div className={styles['info-bar__item']}>
                        <SvgIcons svgIcon={"inProgress"} className={styles["deadline-icon"]} />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className={styles['info-bar__item']}>
                        <SvgIcons svgIcon={"file"} className={styles["files-icon"]} />
                        <span>{0}</span>
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