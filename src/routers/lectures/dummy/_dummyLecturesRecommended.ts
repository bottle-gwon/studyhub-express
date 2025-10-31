import { penguinImageUrl } from '../../../constants/imageUrls.js'
import { lectureUrl } from '../../../constants/linkUrls.js'
import type { Lecture } from '../../../interfaces/_lecturesInterfaces.js'

const dummyLecturesRecommended: Lecture[] = [
  {
    uuid: '660e8400-e29b-41d4-a716-446655440001',
    title: 'Python 기초부터 실전까지',
    instructor: '김철수',
    thumbnail_img_url: penguinImageUrl,
    categories: [
      {
        id: 2,
        name: 'Python',
      },
    ],
    difficulty: 'EASY',
    original_price: 80000,
    discount_price: 40000,
    platform: 'udemy',
    average_rating: 4.9,
    duration: 500,
    url_link: lectureUrl,
    is_bookmarked: true,
  },
  {
    uuid: '660e8400-e29b-41d4-a716-446655440002',
    title: 'React 완전 정복',
    instructor: '이영희',
    thumbnail_img_url: penguinImageUrl,
    categories: [
      {
        id: 6,
        name: 'React',
      },
    ],
    difficulty: 'NORMAL',
    original_price: 120000,
    discount_price: 75000,
    platform: 'inflearn',
    average_rating: 4.8,
    duration: 600,
    url_link: lectureUrl,
    is_bookmarked: false,
  },
  {
    uuid: '660e8400-e29b-41d4-a716-446655440003',
    title: 'Node.js 백엔드 마스터',
    instructor: '박민수',
    thumbnail_img_url: penguinImageUrl,
    categories: [
      {
        id: 9,
        name: 'Node.js',
      },
    ],
    difficulty: 'HARD',
    original_price: 150000,
    discount_price: 90000,
    platform: 'udemy',
    average_rating: 4.7,
    duration: 720,
    url_link: lectureUrl,
    is_bookmarked: true,
  },
]

export default dummyLecturesRecommended
