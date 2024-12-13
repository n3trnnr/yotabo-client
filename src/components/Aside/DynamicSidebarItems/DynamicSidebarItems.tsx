import SvgIcons from '../../UI/Svg/SvgIcons';
import styles from './DynamicSidebarItems.module.scss'
import { IDynamicSidebarItems } from './DynamicSidebarItems.props';

const DynamicSidebarItems = ({ projects }: IDynamicSidebarItems) => {
    return (
        <div className={styles['']}>
            <div>
                <SvgIcons svgIcon={'projects'} /> <span>Projects</span> <SvgIcons svgIcon={'arrowDown'} />
            </div>

            <ul className={styles['']}>

            </ul>
        </div>

    );
}

export default DynamicSidebarItems;