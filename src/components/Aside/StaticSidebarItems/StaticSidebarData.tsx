import { ReactNode } from "react"
import SvgIcons from "../../UI/Svg/SvgIcons"

interface IStaticSidebarData {
    key: string | number;
    title: string;
    path: string;
    svgIcon: ReactNode;
}

export const StaticSidebarData: IStaticSidebarData[] = [
    {
        key: 1,
        title: 'Home',
        path: 'home',
        svgIcon: <SvgIcons svgIcon={'home'} />
    }
]