import { usePostStore } from "@/entities/post/stores"
import { useUpdatePost } from "@/features/post/hooks"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import React from "react"
import { useEditPostModal } from "../hooks/useEditPostModal"

export const EditPostModal: React.FC = () => {
  const { isModalOpen, handleCloseModal } = useEditPostModal()
  const { selectedPost, setSelectedPost } = usePostStore()
  const updatePostMutation = useUpdatePost()

  const updatePost = async () => {
    try {
      if (!selectedPost) return

      const result = await updatePostMutation.mutateAsync({
        id: selectedPost.id,
        title: selectedPost.title,
        body: selectedPost.body,
        tags: selectedPost.tags,
      })
      if (!result) return
      else handleCloseModal()
    } catch (error) {
      console.error("Update Post Error:", error)
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
