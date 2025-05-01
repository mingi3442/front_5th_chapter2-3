import { userApi } from "@/entities/user/api"
import { User } from "@/entities/user/types"

export const UserService = (userApiClient: ReturnType<typeof userApi>) => ({
  getUserProfile: async (userId: number): Promise<User> => {
    try {
      const result = await userApiClient.getProfile(userId)
      return result
    } catch (error) {
      console.error("UserService getUserProfile Error:", error)
      throw error
    }
  },
})
