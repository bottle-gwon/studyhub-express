import express from 'express'
import { dummyChatRoomArray } from './dummy/_dummyChatroom.js'

const chatRouter = express.Router()

chatRouter.get('/rooms', async (req, res) => {
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 5)

  const dummyRoom = dummyChatRoomArray

  const startIndex = (page - 1) * page_size
  const endeIndex = startIndex + page_size

  const result = dummyRoom.slice(startIndex, endeIndex)

  const response = {
    status: 'success',
    code: 'SUCCESS',
    message: '채팅방 목록 조회 성공',
    data: {
      messages: result,
    },
    pagination: {
      page: page,
      page_size: page_size,
      total_count: dummyRoom.length,
    },
  }
  res.status(200).json(response)
})

export default chatRouter
