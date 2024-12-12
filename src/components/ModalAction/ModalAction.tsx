import { IModalAction } from "./ModalAction.props";
import styles from './ModalAction.module.scss'
import SvgIcons from "../UI/Svg/SvgIcons";

const ModalAction = ({ status, error }: IModalAction) => {
    return (
        <output className={styles['modal-action-container']}>
            <div className={styles['modal-action-inner']}>
                <SvgIcons svgIcon={status ? 'fulfilled' : 'reject'} />
                <span>
                    {status ?? error}
                </span>
            </div>
        </output>
    );
}

export default ModalAction;