import { userApi } from "@/entities/user/api"
import { User } from "@/entities/user/core/user.domain"
import { UserMapperService } from "@/entities/user/service/mapper.service"
import { ApiClient } from "@/shared/api"

export interface UserRepository {
  getUserProfile(userId: number): Promise<User>
  getAllUsers(): Promise<User[]>
}

export class UserApiRepository implements UserRepository {
  private api: ReturnType<typeof userApi>
  constructor(apiClient: ApiClient) {
    this.api = userApi(apiClient)
  }

  async getUserProfile(userId: number): Promise<User> {
    try {
      const response = await this.api.getProfile(userId)
      const user = UserMapperService.toDomain(response)
      return user
    } catch (error) {
      console.error("UserRepository getUserProfile Error:", error)
      throw error
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const { users } = await this.api.list()
      return users.map((user) => UserMapperService.toDomain(user))
    } catch (error) {
      console.error("UserRepository getAllUsers Error:", error)
      throw error
    }
  }
}
