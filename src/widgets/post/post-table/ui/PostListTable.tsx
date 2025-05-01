import { useGetPosts } from "@/features/post/hooks"
import { usePostsQueryParams } from "@/shared/stores/query-params"
import { Loading, Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui"
import React from "react"
import { PostListItem } from "./PostListItem"

export const PostListTable: React.FC = () => {
  const [queryParams] = usePostsQueryParams()

  const { data, isLoading } = useGetPosts({
    limit: queryParams.limit,
    skip: queryParams.skip,
    tag: queryParams.tag,
    searchQuery: queryParams.search,
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{data?.posts.map((post) => <PostListItem key={post.id} post={post} />)}</TableBody>
    </Table>
  )
}
