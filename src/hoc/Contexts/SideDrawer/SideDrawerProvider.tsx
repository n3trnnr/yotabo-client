import { createContext, useContext, useState } from "react";
import { ISideDrawerProps } from "../../../components/SideDrawer/SideDrawer.props";

interface SideDrawerContext {
    isOpen: boolean,
    handleOpenSideDrawer: () => void,
    handleCloseSideDrawer: () => void
}

const SideDrawerContext = createContext<SideDrawerContext | null>(null)

const SideDrawerProvider = ({ children }: ISideDrawerProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<null>()

    const handleOpenSideDrawer = () => {
        setIsOpen(true)
    }

    const handleCloseSideDrawer = () => {
        setIsOpen(false)
    }

    return <SideDrawerContext.Provider value={{ isOpen, handleOpenSideDrawer, handleCloseSideDrawer }}>
        {children}
    </SideDrawerContext.Provider>
}

export default SideDrawerProvider;

export const useSideDrawer = () => {
    const context = useContext(SideDrawerContext)
    if (context === null) {
        throw new Error('useModal must be used within a ModalProvider')
    } else {
        return context
    }
}

