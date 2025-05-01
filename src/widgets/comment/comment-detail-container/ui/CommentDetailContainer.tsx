import { useCommentStore } from "@/entities/comment/stores"
import { Comment } from "@/entities/comment/types"
import { useDeleteComment, useGetCommentsByPostId, useLikeComment } from "@/features/comment/hooks"
import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"
import React from "react"
import { useAddCommentModal } from "../../add-comment-modal"
import { useEditCommentModal } from "../../edit-comment-modal"
import { CommentDetailItem } from "./CommentDetailItem"

interface CommentDetailContainerProps {
  postId: number
  searchQuery: string
}

export const CommentDetailContainer: React.FC<CommentDetailContainerProps> = ({ postId, searchQuery }) => {
  const { setPostId } = useCommentStore()
  const { handleOpenModal: handleOpenAddCommentModal } = useAddCommentModal()
  const { handleOpenModal: handleOpenEditCommentModal } = useEditCommentModal()
  const { data: comments } = useGetCommentsByPostId(postId)
  const { setSelectedComment } = useCommentStore()
  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: likeComment } = useLikeComment()

  const handleDeleteComment = (commentId: number, postId: number) => {
    deleteComment({ id: commentId, postId })
  }

  const handleLikeComment = (commentId: number, postId: number) => {
    likeComment({ id: commentId, postId })
  }
  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment.postId, comment.id, comment.body)
    handleOpenEditCommentModal()
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setPostId(postId)
            handleOpenAddCommentModal()
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <CommentDetailItem
            key={comment.id}
            comment={comment}
            searchQuery={searchQuery}
            handleClickDeleteComment={handleDeleteComment}
            handleClickEditComment={handleEditComment}
            handleClickLikeComment={handleLikeComment}
            postId={postId}
          />
        ))}
      </div>
    </div>
  )
}
