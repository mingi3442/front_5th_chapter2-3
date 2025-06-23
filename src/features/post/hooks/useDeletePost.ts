import { POST_QUERY_KEY, postApi } from "@/entities/post/api"
import { userAdapter } from "@/entities/user/api"
import { PostService } from "@/features/post/services"
import { apiClient, queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"
import { PostsWithResult } from "../types"

type DeletePostParams = {
  id: number
}

export const useDeletePost = () => {
  return useMutation<{ result: boolean; id: number }, Error, DeletePostParams>({
    mutationFn: async ({ id }) => {
      const deletedPost = await PostService(postApi(apiClient), userAdapter(apiClient)).deletePost(id)
      return { result: !!deletedPost, id }
    },

    onSuccess: ({ result, id }) => {
      if (!result) return

      queryClient
        .getQueryCache()
        .findAll({ queryKey: POST_QUERY_KEY.all })
        .forEach((query) => {
          queryClient.setQueryData(query.queryKey, (oldData: PostsWithResult | undefined) => {
            if (!oldData) return oldData

            return {
              ...oldData,
              posts: oldData.posts.filter((post: { id: number }) => post.id !== id),
              total: oldData.total - 1,
            }
          })
        })

      queryClient.removeQueries({ queryKey: POST_QUERY_KEY.detail(id) })
    },
  })
}
