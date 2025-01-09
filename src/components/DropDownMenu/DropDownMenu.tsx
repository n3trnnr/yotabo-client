import styles from './DropDownMenu.module.scss'
import { IDropDownMenuProps } from './DropDownMenu.props';

const DropDownMenu = ({ children }: IDropDownMenuProps) => {
    return (
        <div className={styles['drop-down-menu']}>
            <div className={styles['drop-down-menu__inner']}>
                {children}
            </div>
        </div>
    );
}

export default DropDownMenu;