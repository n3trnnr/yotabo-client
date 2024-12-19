import styles from './Sidebar.module.scss'
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore.ts";
import { userActions } from "../../../store/slices/userSlice.ts";
import Button from '../../UI/Button/Button.tsx';
import SvgIcons from '../../UI/Svg/SvgIcons.tsx';
import { LinkItemsData } from '../LinkItems/LinkItemsData.tsx';
import LinkItems from '../LinkItems/LinkItems.tsx';
import DropDownItems from '../DropDownItems/DropDownItems.tsx';
import { useEffect } from 'react';
import { getProjectsData, projectActions } from '../../../store/slices/projectSlice.ts';
import Filter from '../../UI/Filter/Filter.tsx';
import { useModal } from '../../../hoc/Contexts/ModalWindow/ModalProvider.tsx';
import cn from 'classnames';
import ItemsList from '../ItemsList/ItemsList.tsx';

const Sidebar = () => {
    const { handleOpenModal } = useModal();
    const dispatch = useAppDispatch();
    const projects = useAppSelector((state) => state.project.projects);

    const handleChange = (substring: string) => {
        dispatch(projectActions.sortItemsBySubstring(substring))
    }

    useEffect(() => {
        dispatch(getProjectsData())
    }, [])

    return (
        <div className={styles["sidebar"]}>
            <div className={styles['sidebar__inner']}>
                <nav className={styles['nav']}>

                    <ItemsList className={cn(styles['items-list'], styles['items-list__links'])}>
                        {LinkItemsData.map((item) => (
                            <LinkItems
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                path={item.path}
                                icon={item.icon}
                            />
                        ))}
                    </ItemsList>

                    <hr className={styles['separator']} />

                    <div className={styles['drop-down-items']}>
                        <div className={styles['drop-down-items__inner']}>
                            <DropDownItems
                                icon1={<SvgIcons svgIcon={'projects'} />}
                                icon2={<SvgIcons svgIcon={'arrowDown'} />}
                                title={'Project'}
                                settings={<Filter handleChange={handleChange} />}
                                handleClick={handleOpenModal}
                            >
                                <ItemsList className={styles['items-list']}>
                                    {projects?.data.map((project) => (
                                        <LinkItems
                                            key={project.id}
                                            id={project.id}
                                            title={project.attributes.title}
                                            path={`projects/${project.id}`}
                                            icon={<div className={styles['project-icon']} style={{ background: `${project.attributes.hex}` }} />}
                                        />
                                    ))}
                                </ItemsList>
                            </DropDownItems>
                        </div>
                    </div>
                </nav>

                <hr className={styles['separator']} />

                <div className={styles['exit-button-container']}>
                    <Button className={styles['exit']} onClick={() => dispatch(userActions.logOut())} title={'Log out'}>
                        <SvgIcons svgIcon={'exit'} />
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;