import express from 'express'
import dummyTagArray from './dummy/_dummyRecruitTagSearch.js'
import { dummyRecruitArray } from './dummy/_dummyRecruitList.js'

// /recruitments
const recruitRouter = express.Router()

recruitRouter.get('/', async (req, res) => {
  const isLoggedIn = Boolean(req.headers.authorization)
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 10)

  const startIndex = (page - 1) * page_size
  const endeIndex = startIndex + page_size

  const slicedRecruitArray = dummyRecruitArray.slice(startIndex, endeIndex)

  const response = {
    results: slicedRecruitArray,
    page: page,
    page_size: page_size,
    total_count: dummyRecruitArray.length,
  }

  res.status(200).json(response)
})

recruitRouter.get('/tags', async (req, res) => {
  // const isLoggedIn = Boolean(req.headers.authorization)
  const keyword = String(req.query.keyword ?? '')
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 5)

  // 검색 기능 활성화 할때 주석 해제
  // const filter = dummyTagArray.filter((tag)=> tag.name.includes(keyword))
  const filter = dummyTagArray

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

export default recruitRouter
