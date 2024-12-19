import { useState } from 'react';
import Button from '../../UI/Button/Button';
import SvgIcons from '../../UI/Svg/SvgIcons';
import styles from './DropDownItems.module.scss'
import { IDropDownItems } from './DropDownItems.props';
import cn from 'classnames'

const DropDownItems = ({ icon1, icon2, title, children, handleClick, settings }: IDropDownItems) => {
    const [active, setActive] = useState(false)

    return (
        <div className={styles['drop-down-item']}>
            <div className={styles['buttons-list']}>
                <Button className={styles['button-sidebar-item']} onClick={() => setActive(!active)}>
                    {icon1 && icon1}
                    {title}
                    <div className={cn(styles['icon-2'], { [styles['icon-2__active']]: active })}>{icon2 && icon2}</div>
                </Button>

                {handleClick && <Button className={styles['button-add']} handleClick={handleClick}>
                    <SvgIcons svgIcon={'add'} />
                </Button>}
            </div>

            <div className={cn(styles['drop-down-menu'], { [styles['active']]: active })}>
                {settings && settings}

                <hr className={styles['separator']} />
                <div className={styles['drop-down-menu__inner']}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DropDownItems;