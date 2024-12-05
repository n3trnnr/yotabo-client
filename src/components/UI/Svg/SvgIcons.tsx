import React from "react";
import Dashboard from '../../../assets/svg/dashboard.svg?react'
import Logo from '../../../assets/logo/logo.svg?react'
import Projects from '../../../assets/svg/projects.svg?react'
import Boards from '../../../assets/svg/boards.svg?react'
import Settings from '../../../assets/svg/settings.svg?react'
import Trash from '../../../assets/svg/trash.svg?react'
import LogOut from '../../../assets/svg/log-out.svg?react'
import Search from '../../../assets/svg/search.svg?react'
import LightTheme from '../../../assets/svg/light-theme.svg?react'
import Notification from '../../../assets/svg/notification.svg?react'
import User from '../../../assets/svg/user.svg?react'
import BurgerMenu from '../../../assets/svg/burger-menu.svg?react'
import AttachFile from '../../../assets/svg/attach-file.svg?react'
import InProgress from '../../../assets/svg/in-progress.svg?react'
import Deadline from '../../../assets/svg/deadline.svg?react'
import Upload from '../../../assets/svg/upload-file.svg?react'
import UploadCover from '../../../assets/svg/upload-cover.svg?react'
import Download from '../../../assets/svg/download-file.svg?react'
import Filter from '../../../assets/svg/filter.svg?react'
import AddNewElement from '../../../assets/svg/add-new-element.svg?react'
import BoardView from '../../../assets/svg/board-view.svg?react'
import ListView from '../../../assets/svg/list-view.svg?react'
import Description from '../../../assets/svg/description.svg?react'
import Favourites from '../../../assets/svg/favourites-false.svg?react'
import Cross from '../../../assets/svg/close-cross.svg?react'
import Confirm from '../../../assets/svg/confirm.svg?react'
import Error from '../../../assets/svg/error.svg?react'
import { ISvgIcons } from "./SvgIcons.props";

export const iconsList = {
    logo: Logo,
    dashboard: Dashboard,
    projects: Projects,
    boards: Boards,
    settings: Settings,
    trash: Trash,
    logOut: LogOut,
    search: Search,
    lightTheme: LightTheme,
    notification: Notification,
    user: User,
    burgerMenu: BurgerMenu,
    attachFile: AttachFile,
    inProgress: InProgress,
    deadline: Deadline,
    uploadFile: Upload,
    uploadCover: UploadCover,
    download: Download,
    filter: Filter,
    addNewElement: AddNewElement,
    boardView: BoardView,
    listView: ListView,
    description: Description,
    favourites: Favourites,
    cross: Cross,
    confirm: Confirm,
    error: Error
}

const SvgIcons = ({ iconName, styleName }: ISvgIcons) => {

    const IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = iconsList[iconName]

    return (
        <IconComponent className={styleName} />
    )
}

export default SvgIcons