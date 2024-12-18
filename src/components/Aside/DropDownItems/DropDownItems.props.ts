import { ReactNode } from "react";

export interface IDropDownItems {
    icon1: ReactNode,
    icon2: ReactNode,
    title: string,
    settings?: ReactNode,
    children: ReactNode,
    handleClick?: () => void,
    setSubstring?: (substring: string) => void
}