import React from "react";
import styles from './InfoBar.module.scss'
import Button from '../../../components/UI/Button/Button';
import SvgIcons from '../../../components/UI/Svg/SvgIcons';

const InfoBar: React.FC = () => {
    return (
        <>
            <div className={styles["info-bar"]}>
                <div className={styles["priority-container"]}>
                    <div className={styles["priority-title"]}>Priority</div>
                    <div className={styles["priority-value-wrapper"]}>
                        <div className={styles["priority-high"]}></div>
                        <span>High</span>
                    </div>
                </div>
                <div className={styles["creation-date-container"]}>
                    <div className={styles["creation-date-title"]}>Сreation date</div>
                    <div className={styles["creation-date-value"]}>16.04.2024</div>

                </div>
                <div className={styles["deadline-container"]}>
                    <div className={styles["deadline-title"]}>Deadline</div>
                    <div className={styles["deadline-value"]}>29.05.2024</div>
                </div>
                <div className={styles["files-container"]}>
                    <div className={styles["files-title"]}>Files</div>
                    <div className={styles["files-wrapper"]}>
                        <div className={styles["attach-files-icon"]}><SvgIcons svgIcon="file" /></div>
                        <span>file-name.pdf</span>
                        <div className={styles["buttons-wrapper"]}>
                            <Button colorStyle={'none'}>
                                <SvgIcons svgIcon={"download"} className={styles["download-file-button"]} />
                            </Button>
                            <Button colorStyle={'none'}>
                                <SvgIcons svgIcon={"trash"} className={styles["delete-button"]} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoBar;