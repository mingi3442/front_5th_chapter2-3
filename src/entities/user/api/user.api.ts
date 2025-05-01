import { ApiClient } from "@/shared/api/api"
import { ApiResponse } from "@/shared/types"
import { AllUserProfilesResponseDto } from "../dto/user.dto"
import { User } from "../types"

export const userApi = (apiClient: ApiClient) => ({
  fetchAllUserProfiles: async (): Promise<AllUserProfilesResponseDto> => {
    return await apiClient
      .get<ApiResponse<AllUserProfilesResponseDto>>(`/users?limit=0&select=username,image`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error("FetchAllUserProfiles Error: ", error)
        return error
      })
  },
  fetchGetUserProfile: async (userId: number): Promise<User> => {
    return await apiClient
      .get<ApiResponse<User>>(`/users/${userId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchGetUserProfile Error: ", error)
        return error
      })
  },
})
