export type StrapiJob = {
  id: number
  description: string | null
  name: string
  publishedAt: string
}

export type JobResponse = {
  data: StrapiJob[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
