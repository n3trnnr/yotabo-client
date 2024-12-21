import React from 'react';
import MainComponentHeader from '../../components/ProjectNav/MainComponentHeader';
import styles from './TaskPage.module.scss'
import Button from '../../components/UI/Button/Button';
import SvgIcons from '../../components/UI/Svg/SvgIcons';
import InfoBar from './InfoBar/InfoBar';

const TaskPage: React.FC = () => {
    return (
        <>
            <MainComponentHeader type={"none"}>
                <Button buttonShape={"rectangle"} color={"blue"} title={"Upload file"} >
                    <SvgIcons svgIcon={"upload"} className={styles["upload-file-icon"]} />
                </Button>
            </MainComponentHeader>

            <div className={styles["task-page"]}>
                <div className={styles["task-container"]}>
                    <div className={styles["task-wrapper"]}>
                        <div className={styles["cover-wrapper"]}>
                            <button className={styles["upload-cover-button"]}>
                                <SvgIcons svgIcon={"upload"} />
                                <div className={styles["button-name"]}>Upload</div>
                            </button>
                            {/* <img className={styles.cover} src="" alt="" /> */}
                        </div>
                        <div className={styles["content-wrapper"]}>
                            <div className={styles["text-content"]}>
                                <div className={styles["title-wrapper"]}>
                                    <span className={styles.title}>Title</span>
                                </div>
                                <div className={styles.description}>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur.
                                        Bibendum amet amet aliquet et eget faucibus netus in.
                                        Pulvinar vulputate elementum faucibus ac consectetur lacus id.
                                        Velit orci posuere vestibulum eget amet.
                                        Quisque est etiam ipsum euismod eu velit nisl.
                                    </p>
                                </div>
                            </div>
                            <InfoBar />
                        </div>
                        <span className={styles['burger-menu']}>
                            <Button color={'none'}>
                                some icon
                            </Button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskPage;