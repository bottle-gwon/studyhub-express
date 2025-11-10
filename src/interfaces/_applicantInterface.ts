export interface Applicant {
  id: number
  application: {
    nickname: string
    gender: string
    profile_image: string | null
  }
  available_time: string
  has_study_experience: boolean
  status: ApplicantStatus
  created_at: string
}

export type ApplicantStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'

export interface ApplicantListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Applicant[]
}
