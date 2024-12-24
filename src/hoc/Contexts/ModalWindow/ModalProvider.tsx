import { createContext, useContext, useState } from "react";
import { IModalProvider } from "./ModalProvider.props";

interface IModalContext {
    isModalOpen: boolean,
    handleOpenModal: () => void,
    handleCloseModal: () => void,
    modalParams: { type: 'project' | 'column' | 'task', title: string } | null,
    handleModalParams: (params: { type: 'project' | 'column' | 'task', title: string }) => void
}

const ModalContext = createContext<IModalContext | null>(null);

const ModalProvider = ({ children }: IModalProvider) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalParams, setModalParams] = useState<{ type: 'project' | 'column' | 'task', title: string } | null>(null)

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleModalParams = (params: { type: 'project' | 'column' | 'task', title: string }) => {
        setModalParams(params)
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, handleOpenModal, handleCloseModal, modalParams, handleModalParams }}>
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