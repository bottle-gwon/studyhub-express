import express from 'express'
import dummyRecruitManage from './dummy/_dummyRecruitManageList.js'

const recruitManageRouter = express.Router()

recruitManageRouter.get('/', async (req, res) => {
  // 브라우저에서 테스트 시 해당부분 주석
  const isLoggedIn = Boolean(req.headers.authorization)

  if (!isLoggedIn) {
    return res.status(400).json({ error: '로그인이 필요합니다.' })
  }
  // ------여기까지-------
  const page = Number(req.query.page ?? 0)
  const condition = String(req.query.condition ?? '')
  const arrangement = String(req.query.arrangement ?? '')

  const filteredRecruitsManageArray = dummyRecruitManage
    .filter((recruit) => {
      if (condition === '전체') return true
      if (condition === '모집중') return !recruit.is_closed
      if (condition === '마감됨') return recruit.is_closed
      return true
    })

    .sort((a, b) => {
      switch (arrangement) {
        case '최신순':
          return Date.parse(b.created_at) - Date.parse(a.created_at)
        case '북마크 많은 순':
          return (b.bookmark_count ?? 0) - (a.bookmark_count ?? 0)
        case '조회수 높은 순':
          return (b.views_count ?? 0) - (a.views_count ?? 0)
        default:
          return Date.parse(b.created_at) - Date.parse(a.created_at)
      }
    })
  console.log({ filtered: filteredRecruitsManageArray.length })
  const slicedRecruitManageArray = filteredRecruitsManageArray.slice(
    page * 10,
    (page + 1) * 10
  )

  const response = {
    count: filteredRecruitsManageArray.length,
    next: '----not-that-important----',
    previous: '----not-that-important----',
    results: slicedRecruitManageArray,
    user_nickname: '이영수',
  }
  res.status(200).json(response)
})

export default recruitManageRouter
