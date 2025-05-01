import { useCommentStore } from "@/entities/comment/stores"
import { useUpdateComment } from "@/features/comment/hooks"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import React from "react"
import { useEditCommentModal } from "../hooks/useEditCommentModal"

export const EditCommentModal: React.FC = () => {
  const { mutate: updateComment } = useUpdateComment()
  const { id, body, setBody } = useCommentStore()
  const { isModalOpen, handleToggleModal, handleCloseModal } = useEditCommentModal()

  const handleUpdateComment = () => {
    updateComment({ id, body }, { onSuccess: () => handleCloseModal() })
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleToggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
