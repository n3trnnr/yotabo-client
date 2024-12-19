import React from "react";
import { ISvgIcons } from "./SvgIcons.props";

import Logo from '../../../assets/logo/logo.svg?react'
import Dashboard from '../../../assets/svg/dashboard.svg?react'
import Projects from '../../../assets/svg/projects.svg?react'
import Settings from '../../../assets/svg/settings.svg?react'
import Trash from '../../../assets/svg/trash.svg?react'
import Exit from '../../../assets/svg/exit.svg?react'
import Search from '../../../assets/svg/search.svg?react'
import LightTheme from '../../../assets/svg/light-theme.svg?react'
import DarkTheme from '../../../assets/svg/dark-theme.svg?react'
import Notification from '../../../assets/svg/notification.svg?react'
import InProgress from '../../../assets/svg/in-progress.svg?react'
import Deadline from '../../../assets/svg/deadline.svg?react'
import Upload from '../../../assets/svg/upload.svg?react'
import Download from '../../../assets/svg/download.svg?react'
import Filter from '../../../assets/svg/filter.svg?react'
import Add from '../../../assets/svg/add.svg?react'
import Board from '../../../assets/svg/board.svg?react'
import List from '../../../assets/svg/list.svg?react'
import Overview from '../../../assets/svg/overview.svg?react'
import Bookmark from '../../../assets/svg/bookmark.svg?react'
import Close from '../../../assets/svg/close.svg?react'
import Fulfilled from '../../../assets/svg/fulfilled.svg?react'
import Reject from '../../../assets/svg/reject.svg?react'
import ArrowDown from '../../../assets/svg/arrow-down.svg?react'
import ArrowLeft from '../../../assets/svg/arrow-left.svg?react'
import File from '../../../assets/svg/file.svg?react'
import Home from '../../../assets/svg/home.svg?react'


export const iconsList = {
    logo: Logo,
    dashboard: Dashboard,
    projects: Projects,
    settings: Settings,
    trash: Trash,
    exit: Exit,
    search: Search,
    lightTheme: LightTheme,
    darkTheme: DarkTheme,
    notification: Notification,
    inProgress: InProgress,
    deadline: Deadline,
    upload: Upload,
    download: Download,
    filter: Filter,
    add: Add,
    board: Board,
    list: List,
    overview: Overview,
    bookmark: Bookmark,
    close: Close,
    fulfilled: Fulfilled,
    reject: Reject,
    arrowDown: ArrowDown,
    arrowLeft: ArrowLeft,
    file: File,
    home: Home
}

const SvgIcons = ({ svgIcon, className }: ISvgIcons) => {

    const IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = iconsList[svgIcon]

    return (
        <IconComponent className={className} />
    )
}

export default SvgIcons