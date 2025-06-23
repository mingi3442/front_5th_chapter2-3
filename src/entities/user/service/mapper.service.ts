import { User } from "@/entities/user/core/user.domain"
import { UserDto } from "@/entities/user/dto/user.dto"

export class UserMapperService {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      image: user.image,
    }
  }

  static toDomain(dto: UserDto): User {
    return new User(dto.id, dto.username, dto.fullName || "", dto.image || "")
  }

  static toDomainList(dtos: UserDto[]): User[] {
    return dtos.map((dto) => this.toDomain(dto))
  }

  static toDtoList(users: User[]): UserDto[] {
    return users.map((user) => this.toDto(user))
  }
}
