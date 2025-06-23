import { COMMENT_QUERY_KEY } from "@/entities/comment/api"
import { CommentDto } from "@/entities/comment/dto"
import { commentService } from "@/features/comment/services"

import { queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"

type AddCommentParams = {
  body: string
  postId: number
  userId: number
}

export const useAddComment = () => {
  return useMutation<CommentDto, Error, AddCommentParams>({
    mutationFn: async ({ body, postId, userId }) => {
      const result = await commentService.addComment(body, postId, userId)
      return result
    },

    // * 성공 시 캐시 직접 업데이트
    onSuccess: (newComment) => {
      // * 캐시에 있는 댓글 데이터 직접 업데이트
      queryClient.setQueryData(COMMENT_QUERY_KEY.byPostId(newComment.postId), (oldComments: Comment[] | undefined) => {
        if (!oldComments)
          return [newComment] // * 기존 댓글이 없으면 새 배열 생성
        // * 기존 배열에 새 댓글 추가
        else return [newComment, ...oldComments]
      })
    },
  })
}
