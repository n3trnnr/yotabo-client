import { ReactNode } from "react"
import SvgIcons from "../../UI/Svg/SvgIcons"

interface ISidebarLinkItemsData {
    id: string | number;
    title: string;
    path: string;
    icon: ReactNode;
}

export const SidebarLinkItemsData: ISidebarLinkItemsData[] = [
    {
        id: 1,
        title: 'Home',
        path: 'home',
        icon: <SvgIcons svgIcon={'home'} />
    }
]