export const COMMENT_QUERY_KEY = {
  byPostId: (postId: number) => ["comments", postId] as const,
}
