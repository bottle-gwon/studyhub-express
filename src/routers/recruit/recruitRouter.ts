import express from 'express'
import dummyTagArray from './dummy/_dummyRecruitTagSearch.js'
import { dummyGuestRecruitArray } from './dummy/_dummyGuestRecruitList.js'
import { dummyUserRecruitArray } from './dummy/_dummyUserRecruitList.js'
import dummyRecruitManage from './manage/dummy/_dummyRecruitManageList.js'

// /recruitments
const recruitRouter = express.Router()

recruitRouter.get('/', async (req, res) => {
  const isLoggedIn = Boolean(req.headers.authorization)
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 10)

  const startIndex = (page - 1) * page_size
  const endIndex = startIndex + page_size
  const sourceData = isLoggedIn
    ? dummyUserRecruitArray.results
    : dummyGuestRecruitArray
  const slicedRecruitArray = sourceData.slice(startIndex, endIndex)

  // 비로그인 시: 일반 공고만
  const response = {
    page,
    page_size,
    total_count: sourceData.length,
    results: slicedRecruitArray,
    ...(isLoggedIn && {
      recommendations: dummyUserRecruitArray.recommendations,
    }),
  }

  res.status(200).json(response)
})

recruitRouter.get('/tags', async (req, res) => {
  // const isLoggedIn = Boolean(req.headers.authorization)
  const keyword = String(req.query.keyword ?? '')
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 5)

  // 검색 기능 임시
  const filter = dummyTagArray.filter((tag) => tag.name.includes(keyword))

  const total_count = filter.length

  console.log(keyword)

  const startIndex = (page - 1) * page_size
  const endeIndex = startIndex + page_size

  const tagResult = filter.slice(startIndex, endeIndex)

  // 1초 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // if (!isLoggedIn) {
  //   res.status(401).json({ detail: '로그인이 필요한 기능입니다.' })
  // }

  const response = {
    tags: tagResult,
    page: page,
    page_size: page_size,
    total_count: total_count,
  }

  res.status(200).json(response)
})

// 아직 요청 한거 덜 고친거 같아서 이부분은 임시 입니다.
recruitRouter.post('/tags', async (req, res) => {
  // const isLoggedIn = Boolean(req.headers.authorization)

  const recruitment_id = Number(req.body.recruitment_id ?? 101) // 이거 있을 필요 없는데 문서상 존재해서 작성
  const tags = req.body.tags ?? [''] // 하나씩 추가 하는거라 이것도 배열일 필요 없음

  const search = dummyTagArray.filter((tag) => tags.includes(tag.name))

  // 1초 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // if (!isLoggedIn) {
  //   res.status(401).json({ detail: '로그인이 필요한 기능입니다.' })
  // }

  if (search.length === 0) {
    const response = {
      recruitment_id: recruitment_id, // 있을 필요 없음
      added_tags: tags,
      message: '태그가 정상적으로 추가 되었습니다.',
    }
    res.status(201).json(response)
  }

  res.status(409).json({ detail: '이미 존재하는 태그입니다.' })
})

//---- 공고관리 페이지 ----
recruitRouter.get('/my', async (req, res) => {
  // 브라우저에서 테스트 시 해당부분 주석
  // const isLoggedIn = Boolean(req.headers.authorization)

  // if (!isLoggedIn) {
  //     return res.status(400).json({ error: '로그인이 필요합니다.' })
  // }
  // ------여기까지-------
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 10)
  const condition = String(req.query.condition ?? '')
  const arrangement = String(req.query.arrangement ?? '')

  const startIndex = (page - 1) * page_size
  const endIndex = startIndex + page_size

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
    startIndex,
    endIndex
  )

  const response = {
    count: filteredRecruitsManageArray.length,
    // next: '----not-that-important----',
    // previous: '----not-that-important----',
    status: condition,
    ordering: arrangement,
    page: page,
    page_size: page_size,
    results: slicedRecruitManageArray,
    user_nickname: '이영수',
  }
  res.status(200).json(response)
})

//북마크
recruitRouter.post('/:id/bookmark', async (req, res) => {
  const manage_id = Number(req.params.id)
  if (!Number.isFinite(manage_id)) {
    return res.status(400).json({ detail: '잘못된 요청입니다.' })
  }

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

  //서버 저장 시도 했으나, 파일형식 충돌로 공부/해결이 오래걸릴거같아 우선 순위 뒤로 미루기
  res.status(200).json({
    id: targetManage.id,
    title: targetManage.title,
    is_bookmarked: targetManage.is_bookmarked,
    bookmark_count: targetManage.bookmark_count,
  })
  return
})

//카드삭제
recruitRouter.delete('/:id', async (req, res) => {
  const manage_id = Number(req.params.id)
  if (!Number.isFinite(manage_id)) {
    return res.status(400).json({ detail: '잘못된 요청입니다.' })
  }

  const targetManage = dummyRecruitManage.findIndex(
    (manage) => manage.id === manage_id
  )

  if (targetManage === -1) {
    res.status(400).json({
      detail: '잘못된 요청입니다.',
    })
    return
  }

  const removed = dummyRecruitManage.splice(targetManage, 1)[0]
  if (!removed) {
    res.status(400).json({
      detail: '잘못된 요청입니다.',
    })
    return
  }

  res.status(200).json({
    id: removed.id,
    title: removed.title,
    deleted_at: new Date().toISOString(),
  })
  return
})

export default recruitRouter
