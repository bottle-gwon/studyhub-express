export type NotificationType =
  | 'APPLICATION_CREATED'
  | 'APPLICATION_STATUS_APPROVAL'
  | 'APPLICATION_STATUS_REJECTION'
  | 'STUDY_MEMBER_JOINED'
  | 'STUDY_REVIEW_REQUEST'
  | 'STUDY_SCHEDULE_UPCOMING'
  | 'STUDY_SCHEDULE_TODAY'
  | 'STUDY_RECORD_CREATED'
  | 'SYSTEM'
  | 'CUSTOM'

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
