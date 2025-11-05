export type NotificationType =
  | 'STUDY_JOIN'
  | 'STUDY_NOTE_CREATE'
  | 'STUDY_REVIEW_REQUEST'
  | 'APLLICATION_ACCPET'
  | 'APPLICATION_REJECT'
  | 'APPLICATIONS_CREATED' // 기존의 ADD_APPLICATION 대체, 혼자 복수형, 과거형 사용
  | 'TODY_SCHEDULE'
  | 'UPCOMING_SCHEDULE'

export interface Notification {
  id: number
  user_id: number
  content: string
  type: NotificationType
  is_read: boolean
  back_url_link: string
  created_at: string
  updated_at: string
}

// NOTE: 엔드포인트가 notifications라서 복수형으로 썼습니다
export interface NotificationsResponseData {
  count: number
  next: string | null
  previous: string | null
  results: Notification[]
}
