import { ApiClient } from "@/shared/api/api"
import { ApiResponse } from "@/shared/types"
import { AllUserProfilesResponse, UserDto, UserProfileDto } from "../dto/user.dto"

export const userApi = (apiClient: ApiClient) => ({
  list: async (): Promise<AllUserProfilesResponse> => {
    return await apiClient
      .get<ApiResponse<AllUserProfilesResponse>>(`/users?limit=0&select=username,image`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Users List Error: ", error)
        return error
      })
  },
  getProfile: async (userId: number): Promise<UserProfileDto> => {
    return await apiClient
      .get<ApiResponse<UserDto>>(`/users/${userId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("User Profile Error: ", error)
        return error
      })
  },
})
