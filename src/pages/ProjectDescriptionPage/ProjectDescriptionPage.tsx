import { IProjectDescriptionPage } from "./ProjectDescriptionPage.props";
import styles from './ProjectDescriptionPage.module.scss'
import Button from "../../components/UI/Button/Button";

const ProjectDescriptionPage = ({ project }: IProjectDescriptionPage) => {

    // console.log('ProjectDescriptionPage', project);

    return (
        <>
            <div className={styles["description-page"]}>
                <div className={styles["description-container"]}>
                    <div className={styles["project-wrapper"]}>
                        <div className={styles["content-wrapper"]}>
                            <div className={styles["text-content"]}>
                                <div className={styles["title-wrapper"]}>
                                    <span className={styles.title}>{project?.attributes.title}</span>
                                </div>
                                <div className={styles.description}>
                                    <p>
                                        {project?.attributes.description}
                                    </p>
                                </div>
                            </div>
                            {/* <InfoBar /> */}
                        </div>
                        <span className={styles['burger-menu']}>
                            <Button color={'none'}>
                                тут должна быть иконка
                            </Button>
                        </span>
                    </div>
                </div>
            </div>
            {/* <div>{project?.attributes.title}</div>
            <div>{project?.attributes.description}</div>
            <div>{new Date(project?.attributes.createdAt || 0).toLocaleDateString()}</div> */}
        </>
    );
}

export default ProjectDescriptionPage;