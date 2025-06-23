import { POST_QUERY_KEY, postApi } from "@/entities/post/api"
import { usePostTotalStore } from "@/entities/post/stores/post-total.stores"
import { PostWithAuthor } from "@/entities/post/types"
import { userAdapter } from "@/entities/user/api"
import { PostService } from "@/features/post/services"
import { apiClient } from "@/shared/api"
import { useQuery } from "@tanstack/react-query"

type GetPostsOptions = {
  limit?: number
  skip?: number
  tag?: string
  searchQuery?: string
  enabled?: boolean
}

export const useGetPosts = (options: GetPostsOptions = {}) => {
  const { limit = 10, skip = 0, tag, searchQuery, enabled = true } = options
  const { setTotal } = usePostTotalStore()

  // * 검색/태그 상태 확인
  const isSearchQuery = !!searchQuery && searchQuery.length >= 2
  const isTagQuery = !!tag && tag !== "all" && !isSearchQuery

  // * 쿼리 활성화 여부
  const isEnabled = isSearchQuery
    ? enabled && searchQuery.length >= 2
    : isTagQuery
      ? enabled && !!tag && tag !== "all"
      : enabled

  // * 쿼리 키 결정
  const queryKey = isSearchQuery
    ? POST_QUERY_KEY.search(searchQuery)
    : isTagQuery
      ? POST_QUERY_KEY.tag(tag)
      : POST_QUERY_KEY.list({ limit, skip })

  return useQuery({
    queryKey,
    queryFn: async () => {
      const service = PostService(postApi(apiClient), userAdapter(apiClient))
      let result

      if (isSearchQuery) {
        result = await service.searchPosts(searchQuery)
      } else if (isTagQuery && tag) {
        result = await service.getPostsByTag(tag)
      } else {
        result = await service.getAllPosts(limit, skip)
      }

      setTotal(result.total)
      return result
    },
    enabled: isEnabled,
  })
}

export const useGetPostById = (id: number, enabled: boolean = !!id) => {
  return useQuery<PostWithAuthor, Error>({
    queryKey: POST_QUERY_KEY.detail(id),
    queryFn: async () => {
      const service = PostService(postApi(apiClient), userAdapter(apiClient))
      const result = await service.getAllPosts(1, 0)
      const post = result.posts.find((post) => post.id === id)

      if (!post) throw new Error(`useGetPostById: Post not found with id: ${id}`)
      return post
    },
    enabled,
  })
}
