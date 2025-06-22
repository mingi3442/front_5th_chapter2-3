import { COMMENT_QUERY_KEY } from "@/entities/comment/api"
import { commentService } from "@/features/comment/services"
import { useQuery } from "@tanstack/react-query"

export const useGetCommentsByPostId = (postId: number) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.byPostId(postId),
    queryFn: () => commentService.getAllComments(postId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!postId,
  })
}
