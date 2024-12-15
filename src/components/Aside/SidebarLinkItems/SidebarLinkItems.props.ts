import { ReactNode } from "react";

export interface ISidebarLinkItems {
    id: string | number,
    title: string,
    path: string
    icon: ReactNode | string,
}