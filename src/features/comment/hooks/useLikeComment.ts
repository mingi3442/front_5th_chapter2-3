import { COMMENT_QUERY_KEY } from "@/entities/comment/api"
import { Comment } from "@/entities/comment/types"
import { commentService } from "@/features/comment/services"
import { queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"

type LikeCommentParams = {
  id: number
  postId: number
}

export const useLikeComment = () => {
  return useMutation<{ result: boolean; id: number }, Error, LikeCommentParams>({
    mutationFn: async ({ id }) => {
      const result = await commentService.likeComment(id)

      return { result, id }
    },

    onSuccess: ({ result, id }, { postId }) => {
      if (!result) return
      queryClient.setQueryData(COMMENT_QUERY_KEY.byPostId(postId), (oldComments: Comment[] | undefined) => {
        if (!oldComments) return oldComments

        return oldComments.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment))
      })
    },
  })
}
