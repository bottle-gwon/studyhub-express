import type { ApplicantStatus } from './_applicantInterface.js'

export interface ApplicantDetail {
  id: number
  nickname: string
  profile_image: string
  introduction: string
  motivation: string
  goal: string
  available_times: string[]
  has_study_experience: boolean
  study_experience_detail: string
  status: ApplicantStatus
  created_at: string
  gender: string
}
