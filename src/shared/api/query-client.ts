import { QueryClient } from "@tanstack/react-query"

// * tanstack-query 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // * 데이터가 캐싱되는 시간 설정
      staleTime: 5 * 60 * 1000,
      // * 쿼리 요청 실패시 재시도 횟수 설정
      retry: 1,
    },
  },
})
