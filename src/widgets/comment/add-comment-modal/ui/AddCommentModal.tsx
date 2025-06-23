import { useCommentStore } from "@/entities/comment/stores"
import { useUserStore } from "@/entities/user/store"
import { useAddComment } from "@/features/comment/hooks"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import React from "react"
import { useAddCommentModal } from "../hooks/useAddCommentModal"

export const AddCommentModal: React.FC = () => {
  const { isModalOpen, handleCloseModal } = useAddCommentModal()
  const { body, postId, setBody, reset } = useCommentStore()
  const { id } = useUserStore()
  const { mutate: addCommentMutation } = useAddComment()

  const addComment = () => {
    addCommentMutation(
      { body, postId, userId: id },
      {
        onSuccess: () => {
          handleCloseModal()
          reset()
        },
      },
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
