import { IFilter } from "./Filter.props";
import styles from './Filter.module.scss'
import Button from "../Button/Button";
import SvgIcons from "../Svg/SvgIcons";

const Filter = ({ handleChange, children }: IFilter) => {
    return (
        <div className={styles['filter-container']}>
            <input
                className={styles['input-search']}
                type="text"
                placeholder={'Search'}
                onChange={(event) => handleChange!(event.target.value)}
            />
            <Button className={styles['button-filter']}>
                <SvgIcons svgIcon={'filter'} />
            </Button>
            {children}
        </div>
    );
}

export default Filter;