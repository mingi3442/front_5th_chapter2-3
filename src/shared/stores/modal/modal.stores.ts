import { create } from "zustand"

interface ModalState {
  isModalOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
  handleToggleModal: () => void
}

export const createModalStore = () => {
  return create<ModalState>((set) => ({
    isModalOpen: false,
    handleOpenModal: () => set({ isModalOpen: true }),
    handleCloseModal: () => set({ isModalOpen: false }),
    handleToggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  }))
}
