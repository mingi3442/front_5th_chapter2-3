import { AddressDto } from "@/entities/user/dto/address.dto"
import { CompanyDto } from "@/entities/user/dto/company.dto"
import { Pagination } from "@/shared/types"

export type UserDto = {
  id: number
  image: string
  username: string
  fullName?: string
}

export type UserProfileDto = UserDto & {
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: AddressDto
  company?: CompanyDto
}

export type AllUserProfilesResponse = Pagination & {
  users: UserDto[]
}
