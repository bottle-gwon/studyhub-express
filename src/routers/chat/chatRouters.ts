import express from 'express'
import { dummyChatRoomArray } from './dummy/_dummyChatroom.js'
import dummyMessageArray from './dummy/_dummyMessage.js'

const chatRouter = express.Router()

chatRouter.get('/chatrooms', async (_, res) => {
  // const isLoggedIn = Boolean(req.headers.authorization)
  // const page = Number(req.query.page ?? 1)
  // const page_size = Number(req.query.page_size ?? 5)
  // if (!isLoggedIn) {
  //   res.status(401).json({ detail: '로그인이 필요한 기능입니다.' })
  // }
  const dummyRoom = dummyChatRoomArray

  // const startIndex = (page - 1) * page_size
  // const endeIndex = startIndex + page_size

  // const result = dummyRoom.slice(startIndex, endeIndex)
  const result = dummyRoom
  const response = {
    status: 'success',
    code: 'SUCCESS',
    message: '채팅방 목록 조회 성공',
    data: {
      messages: result,
      // pagination: {
      //   page: page,
      //   page_size: page_size,
      //   total_count: dummyRoom.length,
      // },
    },
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))

  res.status(200).json(response)
})

chatRouter.get('/chatrooms/:study_group_uuid/messages', async (req, res) => {
  // const isLoggedIn = Boolean(req.headers.authorization)
  const studyGroupUuid = req.params.study_group_uuid
  console.log(studyGroupUuid) // 현재 특별히 방을 구분하는 로직은 작성하지 않을 예정입니다.
  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 20)

  // if (!isLoggedIn) {
  //   res.status(401).json({ detail: '로그인이 필요한 기능입니다.' })
  // }
  const dummyArray = dummyMessageArray.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  )

  const startIndex = (page - 1) * page_size
  const endeIndex = startIndex + page_size

  const result = dummyArray.slice(startIndex, endeIndex)

  const response = {
    status: 'success',
    code: 'SUCCESS',
    message: '메시지 검색 결과 조회 성공',
    data: {
      messages: result,
      total_count: dummyArray.length,
    },
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))

  res.status(200).json(response)
})
export default chatRouter
