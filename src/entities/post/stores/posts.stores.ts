import { create } from "zustand"
import { PostWithAuthor } from "../types"

interface PostsState {
  posts: Array<PostWithAuthor>
  setPosts: (posts: PostWithAuthor[]) => void
  addPosts: (post: PostWithAuthor) => void
  removePosts: (id: number) => void
  updatePosts: (post: PostWithAuthor) => void
}

export const postsStore = () => {
  return create<PostsState>((set) => ({
    posts: [],
    setPosts: (posts: PostWithAuthor[]) => set({ posts }),
    addPosts: (post: PostWithAuthor) => set((state) => ({ posts: [...state.posts, post] })),
    removePosts: (id: number) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
    updatePosts: (post: PostWithAuthor) =>
      set((state) => ({ posts: state.posts.map((p) => (p.id === post.id ? post : p)) })),
  }))
}
