import { create } from "zustand"

interface PostTotalState {
  total: number
  setTotal: (total: number) => void
}

export const usePostTotalStore = create<PostTotalState>((set) => ({
  total: 0,
  setTotal: (total: number) => set({ total }),
}))
