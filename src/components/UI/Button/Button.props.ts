import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    buttonShape?: 'square' | 'rectangle' | 'none';
    colorStyle: 'blue' | 'dark-grey' | 'light-grey' | 'none';
    styleName?: string;
    handleClick?: () => void;
    title?: string;
}