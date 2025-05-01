import React from "react"
import { useSearchParams } from "react-router-dom"
import { create } from "zustand"

type QueryParamValue = string | number
type QueryParamDefaults = Record<string, QueryParamValue>

interface QueryParamsStore<T extends QueryParamDefaults> {
  queryParams: T
  setQueryParams: (updates: Partial<T>) => void
}

const createQueryParamsStore = <T extends QueryParamDefaults>(defaults: T) => {
  // * Zustand 스토어 생성
  const useStore = create<QueryParamsStore<T>>((set) => ({
    queryParams: { ...defaults },
    setQueryParams: (updates) =>
      set((state) => ({
        queryParams: { ...state.queryParams, ...updates },
      })),
  }))

  // * URL 쿼리 파라미터와 통합된 훅 반환
  return () => {
    const { queryParams, setQueryParams } = useStore()
    const [searchParams, setSearchParams] = useSearchParams()

    // * 컴포넌트 마운트 시 URL에서 쿼리 파라미터 읽기
    React.useEffect(() => {
      const urlParams = Object.fromEntries(
        Object.keys(defaults).map((key) => {
          const paramKey = key as keyof T
          const defaultValue = defaults[paramKey]
          const paramValue = searchParams.get(key)

          const value: QueryParamValue = (() => {
            if (typeof defaultValue === "number") {
              const parsed = paramValue ? Number(paramValue) : defaultValue
              return Number.isNaN(parsed) ? defaultValue : parsed
            }

            return paramValue ?? defaultValue
          })()

          return [paramKey, value]
        }),
      )

      // * URL 쿼리 파라미터가 있으면 스토어 업데이트
      if (Object.keys(urlParams).length > 0) {
        setQueryParams(urlParams as T)
      }
    }, [searchParams, setQueryParams])

    // * 스토어 값이 변경될 때 URL 업데이트
    React.useEffect(() => {
      const urlParams = new URLSearchParams()

      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          urlParams.set(key, String(value))
        }
      })

      setSearchParams(urlParams, { replace: true })
    }, [queryParams, setSearchParams])

    return [queryParams, setQueryParams] as const
  }
}
export const usePostsQueryParams = createQueryParamsStore({
  skip: 0,
  limit: 10,
  search: "",
  sortBy: "",
  sortOrder: "asc",
  tag: "",
})
