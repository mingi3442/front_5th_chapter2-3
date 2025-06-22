import { create } from "zustand"
import { Comment } from "../types"

interface CommentsState {
  comments: Array<Comment>
  setComments: (comments: Comment[]) => void
  addComment: (comment: Comment) => void
  removeComment: (id: number) => void
  updateComment: (comment: Comment) => void
}

export const commentsStore = () => {
  return create<CommentsState>((set) => ({
    comments: [],
    setComments: (comments: Comment[]) => set({ comments }),
    addComment: (comment: Comment) => set((state) => ({ comments: [...state.comments, comment] })),
    removeComment: (id: number) =>
      set((state) => ({ comments: state.comments.filter((comment) => comment.id !== id) })),
    updateComment: (comment: Comment) =>
      set((state) => ({ comments: state.comments.map((c) => (c.id === comment.id ? comment : c)) })),
  }))
}
