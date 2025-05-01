import { usePostTotalStore } from "@/entities/post/stores"
import { AddCommentModal } from "@/widgets/comment/add-comment-modal"
import { EditCommentModal } from "@/widgets/comment/edit-comment-modal"
import { Pagination } from "@/widgets/common/pagination"
import { AddPostModal, useAddPostModal } from "@/widgets/post/add-post-modal"
import { EditPostModal } from "@/widgets/post/edit-post-modal"
import { FilterController } from "@/widgets/post/filter-controller"
import { PostDetailModal } from "@/widgets/post/post-detail-modal"
import { PostListTable } from "@/widgets/post/post-table"
import { UserProfileModal } from "@/widgets/user/profile-modal"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui"

export const PostsManagerPage = () => {
  const { total: totalPosts } = usePostTotalStore()
  const { handleOpenModal } = useAddPostModal()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handleOpenModal}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FilterController />
          <PostListTable />
          <Pagination total={totalPosts} />
        </div>
      </CardContent>

      <AddPostModal />
      <EditPostModal />
      <AddCommentModal />
      <EditCommentModal />
      <PostDetailModal />
      <UserProfileModal />
    </Card>
  )
}
