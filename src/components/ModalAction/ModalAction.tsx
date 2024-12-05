import { IModalAction } from "./ModalAction.props";
import styles from './ModalAction.module.scss'
import SvgIcons from "../UI/Svg/SvgIcons";

const ModalAction = ({ status, error }: IModalAction) => {
    return (
        <div className={styles['modal-action-container']}>
            <div className={styles['modal-action-inner']}>
                <SvgIcons iconName={status ? 'confirm' : 'error'} />
                <span>
                    {status ?? error}
                </span>
            </div>
        </div>
    );
}

export default ModalAction;