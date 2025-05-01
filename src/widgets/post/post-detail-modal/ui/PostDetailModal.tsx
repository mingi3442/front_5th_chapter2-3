import { usePostStore } from "@/entities/post/stores"
import { usePostsQueryParams } from "@/shared/stores/query-params"
import { Dialog, DialogContent, DialogHeader, DialogTitle, HighlightText } from "@/shared/ui"
import { CommentDetailContainer } from "@/widgets/comment/comment-detail-container"
import React from "react"
import { usePostDetailModal } from "../hooks/usePostDetailModal"

export const PostDetailModal: React.FC = () => {
  const { selectedPost } = usePostStore()
  const [queryParams] = usePostsQueryParams()
  const { isModalOpen, handleToggleModal } = usePostDetailModal()

  return (
    <Dialog open={isModalOpen} onOpenChange={handleToggleModal}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title ?? ""} highlight={queryParams.search} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body ?? ""} highlight={queryParams.search} />
          </p>
          <CommentDetailContainer postId={selectedPost?.id || 0} searchQuery={queryParams.search} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
