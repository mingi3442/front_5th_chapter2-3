import { UserDto, UserProfileDto } from "@/entities/user/dto/user.dto"
import { UserData } from "@/entities/user/types"

export class User implements UserData {
  private _id: number
  private _username: string
  private _image: string
  private _firstName?: string
  private _lastName?: string
  private _fullName?: string
  private _age?: number
  private _email?: string
  private _phone?: string
  private _address?: {
    address: string
    city: string
    state: string
  }
  private _company?: {
    name: string
    title: string
  }

  constructor(
    id: number,
    username: string,
    image: string,
    firstName?: string,
    lastName?: string,
    fullName?: string,
    age?: number,
    email?: string,
    phone?: string,
    address?: {
      address: string
      city: string
      state: string
    },
    company?: {
      name: string
      title: string
    },
  ) {
    this._id = id
    this._username = username
    this._image = image
    this._firstName = firstName
    this._lastName = lastName
    this._fullName = fullName || (firstName && lastName ? `${firstName} ${lastName}` : undefined)
    this._age = age
    this._email = email
    this._phone = phone
    this._address = address
    this._company = company
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

  get firstName(): string | undefined {
    return this._firstName
  }

  get lastName(): string | undefined {
    return this._lastName
  }

  get fullName(): string | undefined {
    return this._fullName
  }

  get age(): number | undefined {
    return this._age
  }

  get email(): string | undefined {
    return this._email
  }

  get phone(): string | undefined {
    return this._phone
  }

  get address(): { address: string; city: string; state: string } | undefined {
    return this._address
  }

  get company(): { name: string; title: string } | undefined {
    return this._company
  }

  toDto(): UserDto {
    return {
      id: this.id,
      username: this.username,
      image: this.image,
    }
  }
  toProfileDto(): UserProfileDto {
    return {
      id: this.id,
      username: this.username,
      image: this.image,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      age: this.age,
      email: this.email,
      phone: this.phone,
      address: this.address,
      company: this.company,
    }
  }
}
