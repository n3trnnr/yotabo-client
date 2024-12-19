import { ReactNode } from "react"
import SvgIcons from "../../UI/Svg/SvgIcons"

interface ILinkItemsData {
    id: string | number;
    title: string;
    path: string;
    icon: ReactNode;
}

export const LinkItemsData: ILinkItemsData[] = [
    {
        id: 1,
        title: 'Home',
        path: 'home',
        icon: <SvgIcons svgIcon={'home'} />
    }
]