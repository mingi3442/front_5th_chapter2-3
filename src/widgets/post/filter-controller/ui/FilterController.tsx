import { postApi } from "@/entities/post/api"
import { userAdapter } from "@/entities/user/api"
import { PostService } from "@/features/post/services"
import { apiClient } from "@/shared/api"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { usePostsQueryParams } from "@/shared/stores/query-params/query-params.store"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"

import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

export const FilterController: React.FC = () => {
  const [queryParams, setQueryParams] = usePostsQueryParams()
  const [localSearch, setLocalSearch] = useState(queryParams.search || "")

  const debouncedSearch = useDebounce(localSearch, 300)

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => PostService(postApi(apiClient), userAdapter(apiClient)).getAllTags(),
  })

  useEffect(() => {
    if (debouncedSearch !== queryParams.search) {
      setQueryParams({ search: debouncedSearch })
    }
  }, [debouncedSearch, queryParams.search, setQueryParams])

  if (!tags) return null
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </div>
      <Select
        value={queryParams.tag}
        onValueChange={(value) => {
          setQueryParams({ tag: value })
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={queryParams.sortBy} onValueChange={(value) => setQueryParams({ sortBy: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={queryParams.sortOrder} onValueChange={(value) => setQueryParams({ sortOrder: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
