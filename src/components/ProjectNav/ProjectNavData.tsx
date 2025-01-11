import { ReactNode } from "react";
import SvgIcons from "../UI/Svg/SvgIcons";

interface IProjectData {
    id: string | number,
    title: string,
    path: string,
    icon: ReactNode
}

export const ProjectNavData: IProjectData[] = [
    {
        id: 1,
        title: 'Overview',
        path: 'overview',
        icon: <SvgIcons svgIcon={'overview'} />
    },
    {
        id: 2,
        title: 'Board',
        path: 'board',
        icon: <SvgIcons svgIcon={'board'} />
    },
    {
        id: 3,
        title: 'List',
        path: 'list',
        icon: <SvgIcons svgIcon={'list'} />
    },
    {
        id: 4,
        title: 'Dashboard',
        path: 'dashboard',
        icon: <SvgIcons svgIcon={'dashboard'} />
    },
    {
        id: 5,
        title: 'Files',
        path: 'files',
        icon: <SvgIcons svgIcon={'file'} />
    },
]