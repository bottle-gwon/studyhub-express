import express from 'express'
import dummyTagArray from './dummy/_dummyRecruitTagSearch.js'

// /recruitments
const recruitRouter = express.Router()

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

export default recruitRouter
