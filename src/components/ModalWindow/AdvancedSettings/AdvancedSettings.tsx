import styles from './AdvancedSettings.module.scss'
import SvgIcons from "../../UI/Svg/SvgIcons";
import Button from "../../UI/Button/Button";
import { IAdvancedSettings } from "./AdvancedSettings.props";
import CustomInput from '../../CustomInput/CustomInput';
import { IFile } from '../ModalWindow';

const AdvancedSettings = ({ register, files, handleDeleteFile }: IAdvancedSettings) => {
    //Исправить загрузку файлов, разобраться с багом!
    return (
        <div className={styles["advanced-settings-container"]}>
            <div className={styles["info-block-container"]}>
                <div className={styles["info-block-wrapper"]}>
                    <div className={styles["priority-wrapper"]}>
                        <div className={styles["priority-title"]}>
                            Priority
                        </div>
                        <div className={styles["radio-group-wrapper"]}>
                            <CustomInput
                                register={register}
                                inputName={'priority'}
                                labelClassName={styles["label-radio"]}
                                type={'radio'}
                                defaultValue={'low'}
                                className={styles["input-radio"]}
                                required
                            >
                                <span className={styles["radio-description"]}>
                                    Low
                                </span>
                            </CustomInput>
                            <CustomInput
                                register={register}
                                inputName={'priority'}
                                labelClassName={styles["label-radio"]}
                                type={'radio'}
                                defaultValue={'med'}
                                className={styles["input-radio"]}
                                required
                            >
                                <span className={styles["radio-description"]}>
                                    Med
                                </span>
                            </CustomInput>
                            <CustomInput
                                register={register}
                                inputName={'priority'}
                                labelClassName={styles["label-radio"]}
                                type={'radio'}
                                defaultValue={'high'}
                                className={styles["input-radio"]}
                                required
                            >
                                <span className={styles["radio-description"]}>
                                    High
                                </span>
                            </CustomInput>
                        </div>
                    </div>

                    <div className={styles["deadline-wrapper"]}>
                        <div className={styles["deadline-title"]}>
                            Deadline
                        </div>
                        <CustomInput
                            register={register}
                            inputName={'deadline'}
                            type={'date'}
                            className={styles["deadline-input"]}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className={styles["files-block-container"]}>
                {!files?.length && <CustomInput
                    type={'file'}
                    register={register}
                    labelClassName={styles["label-file"]}
                    inputName={'files'}
                >
                    <SvgIcons iconName={"uploadFile"} styleName={styles["upload-icon"]} />
                    Upload file
                </CustomInput>}

                <ul className={styles["upload-file-wrapper"]}>
                    {files && files.map((file: IFile) => (
                        <li key={`${file.name}_${file.size}`} className={styles["uploaded-file"]}>
                            <span className={styles["uploaded-file-name"]}>
                                {file.name}
                            </span>
                            <Button colorStyle={"none"} handleClick={() => handleDeleteFile(file.name)}>
                                <SvgIcons iconName={"trash"} styleName={styles["delete-icon"]} />
                            </Button>
                        </li>
                    ))
                        // : <li className={styles["uploaded-file-name"]}>choose file</li>
                    }
                </ul>

            </div>
        </div>
    );
}

export default AdvancedSettings;