import { Pagination } from "@/shared/types"

export interface UserProfileResponseDto {
  id: number
  image: string
  username: string
}

export interface AllUserProfilesResponseDto extends Pagination {
  users: UserProfileResponseDto[]
}
