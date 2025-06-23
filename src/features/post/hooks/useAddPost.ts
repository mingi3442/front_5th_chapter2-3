import { POST_QUERY_KEY, postApi } from "@/entities/post/api"
import { PostWithAuthor } from "@/entities/post/types"
import { userAdapter } from "@/entities/user/api"
import { PostService } from "@/features/post/services"
import { apiClient, queryClient } from "@/shared/api"
import { usePostsQueryParams } from "@/shared/stores/query-params"
import { useMutation } from "@tanstack/react-query"
import { PostsWithResult } from "../types"

type AddPostParams = {
  title: string
  body: string
  userId: number
  tags: string[]
}

export const useAddPost = () => {
  const [{ limit, skip }] = usePostsQueryParams()
  return useMutation<PostWithAuthor, Error, AddPostParams>({
    mutationFn: async ({ title, body, userId, tags }) => {
      const service = PostService(postApi(apiClient), userAdapter(apiClient))
      const newPostWithAuthor = await service.addPost(title, body, userId)
      if (!newPostWithAuthor) throw new Error("Error: Fail to add post")

      return {
        ...newPostWithAuthor,
        tags,
        reactions: { likes: 0, dislikes: 0 },
      }
    },

    onSuccess: (newPost) => {
      queryClient.setQueryData(POST_QUERY_KEY.list({ limit, skip }), (oldData: PostsWithResult | undefined) => {
        if (!oldData) return { posts: [newPost], total: 1 }
        return {
          ...oldData,
          posts: [newPost, ...oldData.posts],
          total: oldData.total + 1,
        }
      })

      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEY.list({ limit, skip }),
        refetchType: "none",
      })
    },
  })
}
