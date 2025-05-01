import { COMMENT_QUERY_KEY, commentApi } from "@/entities/comment/api"
import { CommentService } from "@/features/comment/services"
import { apiClient } from "@/shared/api"
import { useQuery } from "@tanstack/react-query"

export const useGetCommentsByPostId = (postId: number) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.byPostId(postId),
    queryFn: () => CommentService(commentApi(apiClient)).getAllComments(postId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!postId,
  })
}
