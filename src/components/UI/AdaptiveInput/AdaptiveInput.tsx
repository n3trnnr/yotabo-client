import { useEffect, useRef } from "react";
import { IAdaptiveInput } from "./AdaptiveInput.props";


const AdaptiveInput = ({ inputValue, ...props }: IAdaptiveInput) => {
    const ref = useRef<HTMLInputElement>(null);
    console.log(inputValue);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.width = `calc(${inputValue.length}ch + 10px)`
        }
    }, [inputValue])

    return <input value={inputValue} ref={ref} {...props} />;
}

export default AdaptiveInput;