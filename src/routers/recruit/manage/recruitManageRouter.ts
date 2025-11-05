import express from 'express'
import dummyRecruitManage from './dummy/_dummyRecruitManageList.js'

const recruitManageRouter = express.Router()

recruitManageRouter.get('/', async (req, res) => {
  // 브라우저에서 테스트 시 해당부분 주석
  // const isLoggedIn = Boolean(req.headers.authorization)

  // if (!isLoggedIn) {
  //     return res.status(400).json({ error: '로그인이 필요합니다.' })
  // }
  // ------여기까지-------
  const page = Number(req.query.page ?? 1)
  // api 명세서상 페이지 기본값 1로 1로 진행
  const condition = String(req.query.condition ?? '')
  const arrangement = String(req.query.arrangement ?? '')

  const filteredRecruitsManageArray = dummyRecruitManage
    .filter((recruit) => {
      if (condition === 'open') return !recruit.is_closed
      if (condition === 'closed') return recruit.is_closed
      return true
    })

    .sort((a, b) => {
      switch (arrangement) {
        case 'created_at':
          return Date.parse(b.created_at) - Date.parse(a.created_at)
        case 'bookmarks':
          return (b.bookmark_count ?? 0) - (a.bookmark_count ?? 0)
        case 'views':
          return (b.views_count ?? 0) - (a.views_count ?? 0)
        default:
          return Date.parse(b.created_at) - Date.parse(a.created_at)
      }
    })
  console.log({ filtered: filteredRecruitsManageArray.length })
  const slicedRecruitManageArray = filteredRecruitsManageArray.slice(
    (page - 1) * 10,
    page * 10
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

recruitManageRouter.post('/:id/bookmark', async (req, res) => {
  const manage_id = Number(req.params.id)
  const targetManage = dummyRecruitManage.find(
    (manage) => manage.id === manage_id
  )

  if (!targetManage) {
    res.status(400).json({
      detail: '잘못된 요청입니다.',
    })
    return
  }

  const toggle = !targetManage.is_bookmarked
  const count = toggle ? 1 : -1

  targetManage.is_bookmarked = toggle
  targetManage.bookmark_count = Math.max(
    0,
    (targetManage.bookmark_count ?? 0) + count
  )

  return res.status(200).json({
    id: targetManage.id,
    title: targetManage.title,
    is_bookmarked: targetManage.is_bookmarked,
    bookmark_count: targetManage.bookmark_count,
  })
})

export default recruitManageRouter
