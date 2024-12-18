import { IFilter } from "./Filter.props";
import styles from './Filter.module.scss'
import Button from "../Button/Button";
import SvgIcons from "../Svg/SvgIcons";

const Filter = ({ handleChange }: IFilter) => {
    return (
        <div className={styles['filter-container']}>
            <input
                className={styles['input-search']}
                type="text"
                onChange={(event) => handleChange(event.target.value)}
            />

            <Button className={styles['button-filter']}>
                <SvgIcons svgIcon={'filter'} />
            </Button>
        </div>
    );
}

export default Filter;