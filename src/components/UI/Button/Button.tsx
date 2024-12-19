import cn from 'classnames'
import styles from './Button.module.scss'
import { IButton } from "./Button.props";

const Button = ({ className, children, childrenAfter, title, handleClick, ...props }: IButton) => {
    return (
        <button
            onClick={handleClick}
            className={cn(
                styles['button'],
                className ?? ''
            )}
            {...props}
        >
            {children && children}
            {title && <span>{title}</span>}
            {childrenAfter && childrenAfter}
        </button>
    );
}

export default Button;