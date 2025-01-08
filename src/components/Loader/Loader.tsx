import SvgIcons from "../UI/Svg/SvgIcons";
import styles from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={styles['loader-overlay']}>
            <SvgIcons svgIcon={'logo'} className={styles['icon']} />
        </div>
    );
}

export default Loader;