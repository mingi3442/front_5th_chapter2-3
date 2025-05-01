export const POST_QUERY_KEY = {
  all: ["posts"] as const,
  list: (params: { limit?: number; skip?: number }) => ["posts", "list", params] as const,
  search: (query: string) => ["posts", "search", query] as const,
  tag: (tag: string) => ["posts", "tag", tag] as const,
  detail: (id: number) => ["post", id] as const,
}
