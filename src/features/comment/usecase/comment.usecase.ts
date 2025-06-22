import { Comment } from '../../../entities/comment/types';


export interface CommentUseCase {
  getAllComments: (postId: number) => Promise<Comment[]>
  addComment: (body: string, postId: number, userId: number) => Promise<Comment>
  updateComment: (id: number, body: string) => Promise<Comment>
  deleteComment: (id: number) => Promise<boolean>
  likeComment: (id: number) => Promise<boolean>
}