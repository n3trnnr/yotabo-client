import { InputHTMLAttributes } from "react";

export interface IAdaptiveInput extends InputHTMLAttributes<HTMLInputElement> {
    inputValue: string
}