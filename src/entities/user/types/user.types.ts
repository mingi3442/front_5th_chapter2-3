import { UserDto, UserProfileDto } from "@/entities/user/dto/user.dto"

export interface UserData {
  id: number
  username: string
  image: string

  firstName?: string
  lastName?: string
  fullName?: string
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

  // DTO 변환 메서드
  toDto(): UserDto
  toProfileDto(): UserProfileDto
}
