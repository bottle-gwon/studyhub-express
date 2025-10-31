import express from 'express'
import dummyLectures from './dummy/_dummyLectures.js'
import dummyLecturesRecommended from './dummy/_dummyLecturesRecommended.js'
import dummyLectureCategories from './dummy/_dummyLectureCategories.js'

const lecturesRouter = express.Router()

// NOTE: 전체 엔드포인트에서 /lectures는 떼고 쓰면 됩니다
// NOTE: 페이지네이션은 0부터 시작한다고 생각
// TODO: API 연결되면 첫 페이지가 0인지 1인지 확인해야 함
// NOTE: 무한 스크롤을 위해 한 페이지를 작게 가져감

lecturesRouter.get('/', async (req, res) => {
  const isLoggedIn = Boolean(req.headers.authorization)
  const page = Number(req.query.page ?? 0)
  const slicedLectureArray = dummyLectures.slice(page * 3, (page + 1) * 3)

  const response = {
    count: 150,
    next: '----not-that-important----',
    previous: '----not-that-important----',
    results: slicedLectureArray,
    user_nickname: isLoggedIn ? '이영수' : undefined,
    recommended_lectures: isLoggedIn ? dummyLecturesRecommended : undefined,
  }

  res.status(200).json(response)
})

lecturesRouter.get('/categories', async (_req, res) => {
  res.status(200).json(dummyLectureCategories)
})

export default lecturesRouter
