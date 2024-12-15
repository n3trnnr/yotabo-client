import { ReactNode } from "react";

export interface IDynamicSidebarItems {
    children: ReactNode,
    iconBefore: ReactNode,
    iconAfter?: ReactNode,
    title: string,
    handeShowModal?: () => void,
    setSubstring: (substring: string) => void
}