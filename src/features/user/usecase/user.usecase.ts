import { UserProfileDto } from "@/entities/user/dto/user.dto"

export interface UserUseCase {
  getUserProfile: (userId: number) => Promise<UserProfileDto>
}
