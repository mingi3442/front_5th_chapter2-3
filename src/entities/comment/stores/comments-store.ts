import { create } from "zustand"
import { CommentDto } from "../dto"

interface CommentsState {
  comments: Array<CommentDto>
  setComments: (comments: CommentDto[]) => void
  addComment: (comment: CommentDto) => void
  removeComment: (id: number) => void
  updateComment: (comment: CommentDto) => void
}

export const commentsStore = () => {
  return create<CommentsState>((set) => ({
    comments: [],
    setComments: (comments: CommentDto[]) => set({ comments }),
    addComment: (comment: CommentDto) => set((state) => ({ comments: [...state.comments, comment] })),
    removeComment: (id: number) =>
      set((state) => ({ comments: state.comments.filter((comment) => comment.id !== id) })),
    updateComment: (comment: CommentDto) =>
      set((state) => ({ comments: state.comments.map((c) => (c.id === comment.id ? comment : c)) })),
  }))
}
