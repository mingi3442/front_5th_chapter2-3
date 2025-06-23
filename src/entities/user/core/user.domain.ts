import { UserDto } from "@/entities/user/dto/user.dto"
import { UserData } from "@/entities/user/types"

export class User implements UserData {
  private _id: number
  private _username: string
  private _image: string

  constructor(id: number, username: string, image: string) {
    this._id = id
    this._username = username
    this._image = image
  }

  get id(): number {
    return this._id
  }

  get username(): string {
    return this._username
  }

  get image(): string {
    return this._image
  }
  toDto(): UserDto {
    return {
      id: this.id,
      username: this.username,
      image: this.image,
    }
  }
}
