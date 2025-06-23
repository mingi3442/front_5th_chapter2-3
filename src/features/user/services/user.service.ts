import { userApi } from "@/entities/user/api"
import { UserUseCase } from "../usecase/user.usecase"

export const UserService = (userApiClient: ReturnType<typeof userApi>): UserUseCase => ({
  getUserProfile: async (userId: number) => {
    try {
      const result = await userApiClient.getProfile(userId)
      return result
    } catch (error) {
      console.error("UserService getUserProfile Error:", error)
      throw error
    }
  },
})
