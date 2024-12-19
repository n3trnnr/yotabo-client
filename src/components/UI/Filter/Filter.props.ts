import { ReactNode } from "react";

export interface IFilter {
    handleChange?: (substring: string) => void,
    children?: ReactNode
}