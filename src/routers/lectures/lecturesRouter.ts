import express from 'express'
import dummyLectures from './dummy/_dummyLectures.js'
import dummyLecturesRecommended from './dummy/_dummyLecturesRecommended.js'
import dummyLectureCategories from './dummy/_dummyLectureCategories.js'
import { updateDummyLectures } from './_lecturesOperations.js'

const lecturesRouter = express.Router()

// NOTE: 전체 엔드포인트에서 /lectures는 떼고 쓰면 됩니다
// NOTE: 페이지네이션은 0부터 시작한다고 생각
// TODO: API 연결되면 첫 페이지가 0인지 1인지 확인해야 함
// NOTE: 무한 스크롤을 위해 한 페이지를 작게 가져감
//
// NOTE: `fs.writeFileSync`를 이용해서 파일을 수정합니다
// NOTE: 이 때는 파일의 주소를 `cwd`(프로젝트 디렉토리)에 나머지 경로를 더해 만듭니다
// NOTE: 이 방법은 `/src/routers/lectures/_lecturesOperations.ts` 파일을 참고해주시기 바랍니다

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

lecturesRouter.post('/bookmarks', async (req, res) => {
  const { lecture_id } = req.body

  const targetLecture = dummyLectures.find(
    (lecture) => lecture.uuid === lecture_id
  )

  if (!targetLecture) {
    res.status(404).json({
      error: '해당 강의를 찾을 수 없습니다.',
    })
    return
  }
  if (targetLecture.is_bookmarked) {
    res.status(400).json({
      error: '이미 북마크한 강의입니다.',
    })
    return
  }

  targetLecture.is_bookmarked = true
  updateDummyLectures(targetLecture)
  res.status(200).json({
    detail: '북마크가 추가되었습니다',
  })
  return
})

lecturesRouter.delete('/bookmarks/:lecture_id', async (req, res) => {
  const lecture_id = req.params.lecture_id

  const targetLecture = dummyLectures.find(
    (lecture) => lecture.uuid === lecture_id
  )

  if (!targetLecture) {
    res.status(404).json({
      error: '해당 강의를 찾을 수 없습니다.',
    })
    return
  }
  if (!targetLecture.is_bookmarked) {
    res.status(404).json({
      error: '존재하지 않는 북마크입니다.',
    })
    return
  }

  targetLecture.is_bookmarked = false
  updateDummyLectures(targetLecture)
  res.status(204).json({
    detail: '북마크가 삭제되었습니다',
  })
  return
})

export default lecturesRouter
