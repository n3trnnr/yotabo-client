import styles from './ProgressBar.module.scss'
import { IProgressBar } from "./ProgressBar.props";

const ProgressBar = ({ progressPercentage = 0 }: IProgressBar) => {

    return (
        <div className={styles['progress-bar-wrapper']}>
            <div className={styles['progress-bar-fill']}>
                <div className={styles['progress-bar-progress']} style={{ width: `${progressPercentage}%` }} />
            </div>
            <div>{`${progressPercentage}%`}</div>
        </div>
    );
}

export default ProgressBar;