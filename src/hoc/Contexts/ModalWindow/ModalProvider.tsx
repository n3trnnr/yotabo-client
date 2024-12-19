import { createContext, useContext, useState } from "react";
import { IModalProvider } from "./ModalProvider.props";

interface IModalContext {
    isModalOpen: boolean,
    handleOpenModal: () => void,
    handleCloseModal: () => void
}

const ModalContext = createContext<IModalContext | null>(null);

const ModalProvider = ({ children }: IModalProvider) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    return (
        <ModalContext.Provider value={{ isModalOpen, handleOpenModal, handleCloseModal }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider

export const useModal = (): IModalContext => {
    const context = useContext(ModalContext);
    if (context === null) {
        throw new Error('useModal must be used within a ModalProvider')
    } else {
        return context
    }
}