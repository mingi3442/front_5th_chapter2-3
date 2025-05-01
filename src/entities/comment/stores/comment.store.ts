import { create } from "zustand"
import { Comment } from "../types"

type CommentStoreState = Pick<Comment, "body" | "postId" | "id"> & {
  userId: number

  setBody: (body: string) => void
  setPostId: (postId: number) => void
  setUserId: (userId: number) => void
  setSelectedComment: (postId: number, commentId: number, body: string) => void
  reset: () => void
}

export const useCommentStore = create<CommentStoreState>((set) => ({
  body: "",
  postId: 0,
  userId: 0,
  id: 0,

  setBody: (body) => set({ body }),
  setPostId: (postId) => set({ postId }),
  setUserId: (userId) => set({ userId }),
  setSelectedComment: (postId: number, commentId: number, body: string) => set({ postId, id: commentId, body }),
  reset: () => set({ body: "", postId: 0 }),
}))
