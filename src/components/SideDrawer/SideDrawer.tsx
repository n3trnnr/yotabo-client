import styles from './SideDrawer.module.scss'
import { ISideDrawerProps } from './SideDrawer.props';

const SideDrawer = ({ children }: ISideDrawerProps) => {
    return (
        <div className={styles['side-drawer']}>
            <div className={styles['side-drawer__inner']}>
                {children}
            </div>
        </div>
    );
}

export default SideDrawer;