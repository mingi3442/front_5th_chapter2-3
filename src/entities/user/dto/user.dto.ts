import { Pagination } from "@/shared/types"

export interface UserDto {
  id: number
  image: string
  username: string
  fullName?: string
}

export interface UserProfileDto extends UserDto {
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: {
    address: string
    city: string
    state: string
  }
  company?: {
    name: string
    title: string
  }
}

export interface AllUserProfilesResponse extends Pagination {
  users: UserDto[]
}
