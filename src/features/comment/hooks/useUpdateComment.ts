import { COMMENT_QUERY_KEY } from "@/entities/comment/api"
import { CommentDto } from "@/entities/comment/dto"
import { commentService } from "@/features/comment/services"
import { queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"

type UpdateCommentParams = {
  id: number
  body: string
}

export const useUpdateComment = () => {
  return useMutation<CommentDto, Error, UpdateCommentParams>({
    mutationFn: async ({ id, body }) => {
      const result = await commentService.updateComment(id, body)
      return result
    },

    onSuccess: (updatedComment: CommentDto) => {
      queryClient.setQueryData(
        COMMENT_QUERY_KEY.byPostId(updatedComment.postId),
        (oldComments: CommentDto[] | undefined) => {
          if (!oldComments) return oldComments

          return oldComments.map((comment) =>
            comment.id === updatedComment.id ? { ...comment, body: updatedComment.body } : comment,
          )
        },
      )
    },
  })
}
