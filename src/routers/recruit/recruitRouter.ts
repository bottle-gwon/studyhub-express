import express from 'express'
import dummyTagArray from './dummy/_dummyRecruitTagSearch.js'
import { dummyGuestRecruitArray } from './dummy/_dummyGuestRecruitList.js'
import { dummyUserRecruitArray } from './dummy/_dummyUserRecruitList.js'
import dummyRecruitManage from './manage/dummy/_dummyRecruitManageList.js'
import { dummyApplicantArray } from './dummy/_dummyApplicatList.js'

// 하흥주 임포트
import dummyRecruitDetailWithBookmark from './dummy/dummyRecruitDetail/_dummyRecruitDetailWithBookmark.js'
import dummyRecruitDetailBase from './dummy/dummyRecruitDetail/_dummyRecruitDetailBase.js'
import type { RecruitDetail } from '@/interfaces/_recruitInterfaces.js'
import dummyRecruitDetailBookmark from './dummy/dummyRecruitDetail/_dummyRecruitDetailBookmark.js'
import fs from 'fs'
import { dummyApplicantDetail } from './dummy/manageDeatilModal/_dummyApplicantDetail.js'

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
recruitRouter.get('/:recruitment_id', async (req, res) => {
  // 브라우저에서 테스트 시 해당부분 주석
  // const isLoggedIn = Boolean(req.headers.authorization)

  // if (!isLoggedIn) {
  //     return res.status(400).json({ error: '로그인이 필요합니다.' })
  // }
  // ------여기까지-------
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 10)

  const status = String(req.query.status ?? '')
  const ordering = String(req.query.ordering ?? 'created_at')

  const startIndex = (page - 1) * page_size
  const endIndex = startIndex + page_size

  const summaryCounts = {
    total: dummyRecruitManage.length,
    open: dummyRecruitManage.filter((item) => item.is_closed === false).length,
    closed: dummyRecruitManage.filter((item) => item.is_closed === true).length,
  }

  const filteredRecruitsManageArray = dummyRecruitManage
    .filter((recruit) => {
      if (status === 'open') return !recruit.is_closed
      if (status === 'closed') return recruit.is_closed
      return true
    })

    .sort((a, b) => {
      switch (ordering) {
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

  const baseUrl = `----not-that-important----/recruitments/:user_id/?status=${status ? status : ''}?ordering=${ordering}&page=`
  const previous = page === 1 ? null : `${baseUrl}${page - 1}`
  const next = page > 5 ? null : `${baseUrl}${page + 1}`

  const response = {
    count: summaryCounts,
    previous,
    next,
    status,
    ordering,
    page,
    page_size,
    results: slicedRecruitManageArray,
    user_nickname: '이영수',
  }
  res.status(200).json(response)
})

// 공고 지원자 조회
recruitRouter.get('/:recruitment_id/applications', async (req, res) => {
  const isLoggedIn = Boolean(req.headers.authorization)
  const page = Number(req.query.page ?? 1)
  const limit = Number(req.query.limit ?? 10)

  const start = (page - 1) * limit
  const end = start + limit
  const slicedApplicantArray = dummyApplicantArray.slice(start, end)

  const total = dummyApplicantArray.length
  const hasNextPage = end < total

  const response = {
    count: total,
    next: hasNextPage
      ? `/api/v1/recruitment/${req.params.recruitment_id}/applications?page=${page + 1}&limit=${limit}`
      : null,
    previous:
      page > 1
        ? `/api/v1/recruitment//${req.params.recruitment_id}/applications?page=${page - 1}&limit=${limit}`
        : null,
    results: slicedApplicantArray,
  }

  if (!isLoggedIn) {
    res.status(401).json({ detail: '로그인이 필요한 기능입니다.' })
  }

  res.status(200).json(response)
})

// 공고 지원자 상세 조회
recruitRouter.get('/applications/:application_id', async (req, res) => {
  const isLoggedIn = Boolean(req.headers.authorization)
  if (!isLoggedIn) {
    res.status(401).json({ detail: '로그인이 필요한 기능입니다.' })
  }

  const applicationId = Number(req.params.application_id)
  const application = dummyApplicantDetail.find(
    (application) => application.id === applicationId
  )
  if (!application) {
    return res.status(404).json({ error: '데이터를 찾을 수 없습니다.' })
  }

  return res.status(200).json(application)
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

// ---- 하흥주 라우트 ----
recruitRouter.get('/:recruitId/', async (req, res) => {
  const isLoggedIn = Boolean(req.headers.authorization)
  const recruitId = Number(req.params.recruitId)
  // NOTE: 자기 공고와 남의 공고를 비요할 땐 아래 주석을 바꿔주세요
  const author_nickname = 'admin'
  // const dummyAuthorNickname = "not-admin"
  // ---- 여기까지

  if (!isLoggedIn) {
    const response: RecruitDetail = {
      ...dummyRecruitDetailBase,
      author_nickname,
      is_bookmarked: false,
      id: recruitId,
    }
    res.status(200).json(response)
    console.log('---- NOT LOGGED IN ----')
    return
  }

  const response: RecruitDetail = {
    ...dummyRecruitDetailWithBookmark,
    author_nickname,
    id: recruitId,
  }

  res.status(200).json(response)
})

// NOTE: 공고 세부 페이지의 북마크를 테스트하기 위해선 아래를 수정해야 합니다
// 1. 위에 있는 공고관리 페이지의 북마크 부분(recruitRouter.post('/:id/bookmark', ...) 전체를 주석처리 합니다
// 2. 아래의 주석을 해제합니다
// recruitRouter.post('/:recruitId/bookmark', async (_req, res) => {
//   const newBookmark = !dummyRecruitDetailBookmark.is_bookmarked
//
//   const newContent = ` const dummyRecruitDetailBookmark = {
//   is_bookmarked: ${newBookmark},
// }
//
// export default dummyRecruitDetailBookmark
// `
//   const path = [
//     process.cwd(),
//     '/src/routers/recruit/dummy/dummyRecruitDetail/_dummyRecruitDetailBookmark.ts',
//   ].join('')
//   fs.writeFileSync(path, newContent, 'utf8')
//
//   const response = {
//     id: 301,
//     title: '----not-that-important',
//     is_bookmarked: newBookmark,
//     bookmark_count: 5,
//   }
//   res.status(200).json(response)
// })
// ---- 여기까지

export default recruitRouter
