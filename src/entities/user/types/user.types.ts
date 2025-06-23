import { UserDto } from "@/entities/user/dto/user.dto"

export interface UserData {
  id: number
  username: string
  image: string
  firstName?: string
  lastName?: string
  fullname?: string
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
  toDto(): UserDto
}
