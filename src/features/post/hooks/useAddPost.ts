import { POST_QUERY_KEY, postApi } from "@/entities/post/api"
import { PostWithAuthor } from "@/entities/post/types"
import { userApi } from "@/entities/user/api"
import { PostService, PostsWithResult } from "@/features/post/services"
import { apiClient, queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"

type AddPostParams = {
  title: string
  body: string
  userId: number
  tags: string[]
}

export const useAddPost = () => {
  return useMutation<PostWithAuthor, Error, AddPostParams>({
    mutationFn: async ({ title, body, userId, tags }) => {
      const service = PostService(postApi(apiClient), userApi(apiClient))
      const newPost = await service.addPost(title, body, userId)
      if (!newPost) throw new Error("Error: Fail to add post")

      const { users } = await userApi(apiClient).fetchAllUserProfiles()
      const author = users.find((user) => user.id === userId)

      return {
        ...newPost,
        id: newPost.id || Math.floor(Math.random() * 1000) + 100,
        title,
        body,
        userId,
        author,
        tags,
        reactions: { likes: 0, dislikes: 0 },
      }
    },

    onSuccess: (newPost) => {
      queryClient.setQueryData(POST_QUERY_KEY.list({ limit: 10, skip: 0 }), (oldData: PostsWithResult | undefined) => {
        if (!oldData) return { posts: [newPost], total: 1 }
        return {
          ...oldData,
          posts: [newPost, ...oldData.posts],
          total: oldData.total + 1,
        }
      })

      // * 검색 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: POST_QUERY_KEY.search(""),
        refetchType: "none",
      })
    },
  })
}
