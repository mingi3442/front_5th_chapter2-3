export interface UserReference {
  id: number
  username: string
  fullName: string
}

export interface Comment {
  body: string
  id: number
  likes: number
  postId: number
  user: UserReference
}
