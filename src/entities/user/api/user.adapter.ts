import { userApi } from "@/entities/user/api/user.api"
import { AllUserProfilesResponse, UserProfileDto } from "@/entities/user/dto/user.dto"
import { ApiClient } from "@/shared/api"

export interface UserDataSource {
  list(): Promise<AllUserProfilesResponse>
  getProfile(userId: number): Promise<UserProfileDto>
}

export class UserApiAdapter implements UserDataSource {
  private api: ReturnType<typeof userApi>

  constructor(apiClient: ApiClient) {
    this.api = userApi(apiClient)
  }

  async list(): Promise<AllUserProfilesResponse> {
    return await this.api.list()
  }

  async getProfile(userId: number): Promise<UserProfileDto> {
    return await this.api.getProfile(userId)
  }
}
