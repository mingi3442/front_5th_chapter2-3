import { UserRepository } from "@/entities/user/repository"
import { UserUseCase } from "../usecase/user.usecase"

export const UserService = (userRepository: UserRepository): UserUseCase => ({
  getUserProfile: async (userId: number) => {
    try {
      const result = await userRepository.getUserProfile(userId)
      return result
    } catch (error) {
      console.error("UserService getUserProfile Error:", error)
      throw error
    }
  },
})
