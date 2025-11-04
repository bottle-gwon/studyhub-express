export type Difficulty = 'EASY' | 'NORMAL' | 'HARD'

export interface LectureCategory {
  id: number
  name: string
}

export interface Lecture {
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: LectureCategory[]
  difficulty: Difficulty
  original_price: number
  discount_price: number
  platform: 'inflearn' | 'udemy'
  average_rating: number
  duration: number
  url_link: string
  is_bookmarked: boolean
}

export type LectureReviewRating =
  | '1_OUT_OF_5_STARS'
  | '2_OUT_OF_5_STARS'
  | '3_OUT_OF_5_STARS'
  | '4_OUT_OF_5_STARS'
  | '5_OUT_OF_5_STARS'

export interface LectureReview {
  id: number
  rating: LectureReviewRating
  content: string
  created_at: string
}

export type LectureOrdering =
  | '-created_at'
  | '-price'
  | 'price'
  | '-rating'
  | 'rating'

export const lectureOrderingInTextArray = [
  '최신순',
  '가격 높은 순',
  '가격 낮은 순',
  '평점 높은 순',
  '평점 낮은 순',
] as const
export type LectureOrderingInText = (typeof lectureOrderingInTextArray)[number]

export interface LectureReview {
  id: number
  rating: LectureReviewRating
  content: string
  created_at: string
}
