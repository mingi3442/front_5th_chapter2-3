import { POST_QUERY_KEY, postApi } from "@/entities/post/api"
import { PostWithAuthor } from "@/entities/post/types"
import { userAdapter } from "@/entities/user/api"
import { PostService } from "@/features/post/services"
import { apiClient, queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"
import { PostsWithResult } from "../types"

interface UpdatePostParams {
  id: number
  title: string
  body: string
  tags: string[]
}

export const useUpdatePost = () => {
  return useMutation<PostWithAuthor, Error, UpdatePostParams>({
    mutationFn: async ({ id, title, body, tags }) => {
      const postService = PostService(postApi(apiClient), userAdapter(apiClient))

      const updatedPost = await postService.updatePost({ id, title, body, tags })
      if (!updatedPost) throw new Error(`useUpdatePost: Failed to update post with id: ${id}`)

      return {
        ...updatedPost,
        reactions: updatedPost.reactions || { likes: 0, dislikes: 0 },
      }
    },

    onSuccess: (updatedPost) => {
      // * 메인 페이지 목록 업데이트
      queryClient.setQueryData(POST_QUERY_KEY.list({ limit: 10, skip: 0 }), (oldData: PostsWithResult | undefined) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          posts: oldData.posts.map((post: PostWithAuthor) => (post.id === updatedPost.id ? updatedPost : post)),
        }
      })

      // * 기타 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEY.all,
        refetchType: "none",
      })
    },
  })
}
