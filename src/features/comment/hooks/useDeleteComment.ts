import { COMMENT_QUERY_KEY, commentApi } from "@/entities/comment/api"
import { Comment } from "@/entities/comment/types"
import { CommentService } from "@/features/comment/services"
import { apiClient, queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"

type DeleteCommentParams = {
  id: number
  postId: number
}

export const useDeleteComment = () => {
  return useMutation<{ result: boolean; postId: number }, Error, DeleteCommentParams>({
    mutationFn: async ({ id, postId }) => {
      const result = await CommentService(commentApi(apiClient)).deleteComment(id)
      return { result, postId }
    },
    onSuccess: ({ postId }, { id }) => {
      queryClient.setQueryData(COMMENT_QUERY_KEY.byPostId(postId), (oldComments: Comment[] | undefined) => {
        if (!oldComments) return oldComments

        return oldComments.filter((comment) => comment.id !== id)
      })
    },
  })
}
