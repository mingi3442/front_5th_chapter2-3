import { UserDto, UserProfileDto } from "@/entities/user/dto/user.dto"
import { AddressValue } from "./address.types"
import { CompanyValue } from "./company.types"

export interface UserEntity {
  id: number
  username: string
  image: string

  firstName?: string
  lastName?: string
  fullName?: string
  age?: number
  email?: string
  phone?: string

  address?: AddressValue
  company?: CompanyValue

  // DTO 변환 메서드
  toDto(): UserDto
  toProfileDto(): UserProfileDto
}
