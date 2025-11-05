export interface Recruit {
  id: number
  uuid: string
  title: string
  content: string
  thumbnail_img_url: string
  expected_headcount: number
  current_headcount: number
  estimated_fee: number
  views_count: number
  bookmark_count: number
  due_date: string
  is_closed: boolean
  tags: { id: number; name: string }[]
  lectures: { id: number; title: string; instructor: string }[]
  study_group: { id: number; uuid: string; name: string } | null
  author: { id: number; nickname: string; profile_img_url: string }
  is_bookmarked: boolean
  created_at: string
  updated_at: string | null
}

export interface RecruitWithAuth extends Recruit {
  is_bookmarked: boolean
}

export interface RecruitmentsListResponseWithAuth {
  recommendations: RecruitWithAuth[]
  results: RecruitWithAuth[]
  page: number
  page_size: number
  total_count: number
}

export interface RecruitmentListResponse {
  results: Recruit[]
  page: number
  page_size: number
  total_count: number
}

export type RecruitOrdering = 'created_at' | 'bookmarks' | 'views'

export const recruitArrangementInTextArray = [
  '최신순',
  '북마크 많은 순',
  '조회수 높은 순',
] as const

export type RecruitArrangementInText =
  (typeof recruitArrangementInTextArray)[number]

export const recruitConditionInTextArray = ['전체', '모집중', '마감됨'] as const
export type RecruitConditionInText =
  (typeof recruitConditionInTextArray)[number]
