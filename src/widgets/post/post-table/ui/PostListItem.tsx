import { usePostStore } from "@/entities/post/stores"
import { PostWithAuthor } from "@/entities/post/types"
import { TagView } from "@/entities/post/ui"
import { useDeletePost } from "@/features/post/hooks"
import { usePostsQueryParams } from "@/shared/stores/query-params"
import { Button, HighlightText, TableCell, TableRow } from "@/shared/ui"
import { useUserProfileModalStore } from "@/widgets/user/profile-modal"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useEditPostModal } from "../../edit-post-modal"
import { usePostDetailModal } from "../../post-detail-modal"

interface PostListItemProps extends React.HTMLAttributes<HTMLTableRowElement> {
  post: PostWithAuthor
}

export const PostListItem = ({ post, ...props }: PostListItemProps) => {
  const [queryParams, setQueryParams] = usePostsQueryParams()
  const { setSelectedPost } = usePostStore()
  const { handleOpenModal: handleOpenUserModal } = useUserProfileModalStore()
  const { handleOpenModal: handleOpenEditModal } = useEditPostModal()
  const { handleOpenModal: handleOpenPostDetailModal } = usePostDetailModal()
  const deletePostMutation = useDeletePost()
  const deletePost = async (id: number) => {
    try {
      const result = await deletePostMutation.mutateAsync({ id })

      if (!result) return
      else handleOpenPostDetailModal()
    } catch (error) {
      console.error("deletePost error:", error)
    }
  }
  return (
    <TableRow {...props}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <HighlightText text={post.title} highlight={queryParams.search || ""} />
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => <TagView key={tag} tag={tag} onClick={() => setQueryParams({ tag: tag })} />)}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            setSelectedPost(post)
            handleOpenUserModal()
          }}
        >
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPost(post)
              handleOpenPostDetailModal()
            }}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPost(post)
              handleOpenEditModal()
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
