import { useState } from 'react';
import Button from '../../UI/Button/Button';
import SvgIcons from '../../UI/Svg/SvgIcons';
import styles from './DynamicSidebarItems.module.scss'
import { IDynamicSidebarItems } from './DynamicSidebarItems.props';
import cn from 'classnames'

const DynamicSidebarItems = ({ children, iconBefore, iconAfter, title, handeShowModal, setSubstring }: IDynamicSidebarItems) => {

    const [active, setActive] = useState(false)

    return (
        <div className={styles['container']}>
            <div className={styles['buttons-list']}>
                <Button className={styles['button-item__menu']} onClick={() => setActive(!active)}>
                    {iconBefore && iconBefore}
                    <span>{title}</span>
                    {iconAfter && iconAfter}
                </Button>

                <Button className={styles['button-item__add']} handleClick={handeShowModal}>
                    <SvgIcons svgIcon={'add'} />
                </Button>
            </div>

            <div className={cn({ [styles['active']]: active })}>
                <div className={styles['filter-menu']}>
                    <input
                        className={styles['input-search']}
                        type="text"
                        onChange={(event) => setSubstring(event.target.value)}
                    />

                    <Button className={styles['button-filter']}>
                        <SvgIcons svgIcon={'filter'} />
                    </Button>
                </div>

                <hr className={styles['separator']} />
                {children}
            </div>
        </div>
    );
}

export default DynamicSidebarItems;