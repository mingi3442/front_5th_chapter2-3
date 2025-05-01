import { usePostsQueryParams } from "@/shared/stores/query-params/query-params.store"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"

interface PaginationProps {
  total: number
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const [queryParams, setQueryParams] = usePostsQueryParams()
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={queryParams.limit.toString()}
          onValueChange={(value) => setQueryParams({ limit: Number(value), skip: 0 })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button
          disabled={queryParams.skip === 0}
          onClick={() => setQueryParams({ skip: Math.max(0, queryParams.skip - queryParams.limit) })}
        >
          이전
        </Button>
        <Button
          disabled={queryParams.skip + queryParams.limit >= total}
          onClick={() => setQueryParams({ skip: queryParams.skip + queryParams.limit })}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
