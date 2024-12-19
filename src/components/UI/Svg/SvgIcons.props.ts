import { iconsList } from "./SvgIcons";

export interface ISvgIcons {
    svgIcon: keyof typeof iconsList;
    className?: string;
}