import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    className: string,
    children?: ReactNode,
    childrenAfter?: ReactNode,
    handleClick?: () => void,
    title?: string
}