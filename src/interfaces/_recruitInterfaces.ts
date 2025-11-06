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

export type RecruitStatus = '' | 'open' | 'closed'

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

// ---- recruit manage
export interface RecruitsManageResponse {
  count: number
  status: '' | 'open' | 'closed'
  ordering: 'created_at' | 'bookmarks' | 'views'
  page: number
  page_size: number
  results: Recruit[]
  user_nickname: string
}

// ---- recruit detail
export interface RecruitDetailAttachment {
  id: number
  file_name: string
  url: string
  // TODO: api 요청해야
  size: number // <<---- 바이트 단위로 받아야 함
}

export interface RecruitDetailLecture {
  thumbnail_url: string
  name: string
  instructor: string
  link: string
  price: number
}

export interface RecruitDetail {
  // NOTE: author api 요청드림
  author_nickname: string
  study_name: string
  id: number
  title: string
  content: string
  // TODO: 이미지 api 연결하고 이부분 살펴봐야 함
  content_images: string[] // 이것도 필요하니 detail 쪽으로 가야겠네... 하지만 이미지는 아직 어떻게 하는지 모르겠다
  attachments: RecruitDetailAttachment[] // 이게 필요하다그러니 detail 매번 요청보내야 함
  expected_personnel: number
  expected_fee: number
  lectures: RecruitDetailLecture[]
  tags: string[]
  due_date: string
  created_at: string
  views: number
  bookmark_count: number
  is_bookmarked: boolean
}
