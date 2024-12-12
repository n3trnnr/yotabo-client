import { nanoid } from "nanoid"
import { ReactNode } from "react"
import SvgIcons from "../../UI/Svg/SvgIcons"

interface ISidebarData {
    key: string;
    title: string;
    path: string;
    icon: (styleName: string) => ReactNode;
}

export const SidebarData: ISidebarData[] = [
    {
        key: nanoid(),
        title: 'Dashboard',
        path: 'dashboard',
        icon: (styleName: string): ReactNode => {
            return <SvgIcons svgIcon={'dashboard'} className={styleName} />
        }
    },
    {
        key: nanoid(),
        title: 'Projects',
        path: 'projects',
        icon: (styleName: string): ReactNode => {
            return <SvgIcons svgIcon={'projects'} className={styleName} />
        }
    },
    {
        key: nanoid(),
        title: 'Settings',
        path: 'settings',
        icon: (styleName: string): ReactNode => {
            return <SvgIcons svgIcon={'settings'} className={styleName} />
        }
    },
    {
        key: nanoid(),
        title: 'Trash',
        path: 'trash',
        icon: (styleName: string): ReactNode => {
            return <SvgIcons svgIcon={'trash'} className={styleName} />
        }
    },
    {
        key: nanoid(),
        title: 'Log out',
        path: 'logout',
        icon: (styleName: string): ReactNode => {
            return <SvgIcons svgIcon={'exit'} className={styleName} />
        }
    }
]