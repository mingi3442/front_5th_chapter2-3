import { create } from "zustand"
import { User } from "../types"

type UserStoreState = Pick<User, "id">

export const useUserStore = create<UserStoreState>((set) => ({
  id: 1,
  setSelectedUserId: (id: number) => set({ id }),
}))
