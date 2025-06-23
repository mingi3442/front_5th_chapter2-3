import { create } from "zustand"
import { UserDto } from "../dto/user.dto"

type UserStoreState = Pick<UserDto, "id">

export const useUserStore = create<UserStoreState>((set) => ({
  id: 1,
  setSelectedUserId: (id: number) => set({ id }),
}))
