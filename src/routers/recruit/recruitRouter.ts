import express from 'express'

// /recruitments
const recruitRouter = express.Router()

recruitRouter.get('/tags', async (req, res) => {
  const isLoggedIn = Boolean(req.headers.authorization)
  const page = Number(req.body.page ?? 1)
  const page_size = Number(req.body.page_size ?? 5)

  if (!isLoggedIn) {
    res.status(401).json({ detail: '로그인이 필요한 기능입니다.' })
  }

  const response = {
    tags: [],
    page: page,
    page_size: page_size,
    total_cout: 30,
  }

  res.status(200).json(response)
})
