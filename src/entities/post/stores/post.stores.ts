import { create } from "zustand"
import { PostWithAuthor } from "../types"

type PostStoreState = {
  selectedPost: PostWithAuthor | null
  setSelectedPost: (post: PostWithAuthor | null) => void
}

export const usePostStore = create<PostStoreState>((set) => ({
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
}))
