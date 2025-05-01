import { useAddPost } from "@/features/post/hooks"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import React, { useState } from "react"
import { useAddPostModal } from "../hooks/useAddPostModal"

// * React Hook Form 사용하는게 나을지도
export const AddPostModal: React.FC = () => {
  const { isModalOpen, handleToggleModal, handleCloseModal } = useAddPostModal()
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const addPostMutation = useAddPost()

  const addPost = async () => {
    try {
      await addPostMutation.mutateAsync({
        title: newPost.title,
        body: newPost.body,
        userId: newPost.userId,
        tags: [],
      })

      setNewPost({ title: "", body: "", userId: 1 })
      handleCloseModal()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleToggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
