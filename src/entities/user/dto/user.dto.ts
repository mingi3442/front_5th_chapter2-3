import { Pagination } from "@/shared/types"

export interface UserDto {
  id: number
  image: string
  username: string
}

export interface AllUserProfilesResponse extends Pagination {
  users: UserDto[]
}
