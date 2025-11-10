import type { NotificationsResponseData } from '@/interfaces/index.js'
import express from 'express'
import dummyNotifications from './_dummyNotifications.js'
import fs from 'fs'
import { sleep } from '../utils/sleep.js'

const notificationsRouter = express.Router()

notificationsRouter.get('/', async (req, res) => {
  // NOTE: 스켈레톤 확인용입니다
  await sleep(1000)

  const page = Number(req.query.page ?? 1)
  const page_size = Number(req.query.page_size ?? 5)
  const is_read = req.query.is_read
    ? req.query.is_read === 'true'
      ? true
      : false
    : null

  const filteredDummy = dummyNotifications.filter((notification) =>
    is_read === null ? true : notification.is_read === is_read
  )
  const slicedDummy = filteredDummy.slice(
    (page - 1) * page_size,
    page * page_size
  )

  const count = filteredDummy.length
  const totalPage = Math.ceil(count / page_size)
  const baseUrl = `----not-that-important----/notifications/?is_read=${is_read ? is_read : ''}&page=`
  const previous = page === 1 ? null : `${baseUrl}${page - 1}`
  const next = page > totalPage ? null : `${baseUrl}${page + 1}`

  const response: NotificationsResponseData = {
    count: filteredDummy.length,
    previous,
    next,
    results: slicedDummy,
  }

  res.status(200).json(response)
})

notificationsRouter.patch('/:notificationId/read', async (req, res) => {
  const notificationId = Number(req.params.notificationId || 0)

  const newNotificationArray = dummyNotifications.map((notification) =>
    notification.id === notificationId
      ? { ...notification, is_read: true }
      : notification
  )

  const newContent = ` import type { Notification } from '@/interfaces/_notificationInterfaces.js'

const dummyNotifications: Notification[] = ${JSON.stringify(newNotificationArray)}


export default dummyNotifications
`

  const path = `${process.cwd()}/src/routers/notifications/_dummyNotifications.ts`
  fs.writeFileSync(path, newContent, 'utf8')

  res.status(204).json()
})

notificationsRouter.patch('/read-all', async (_req, res) => {
  const newNotificationArray = dummyNotifications.map((notification) => ({
    ...notification,
    is_read: true,
  }))

  const newContent = ` import type { Notification } from '@/interfaces/_notificationInterfaces.js'

const dummyNotifications: Notification[] = ${JSON.stringify(newNotificationArray)}


export default dummyNotifications
`

  const path = `${process.cwd()}/src/routers/notifications/_dummyNotifications.ts`
  fs.writeFileSync(path, newContent, 'utf8')

  res.status(204).json()
})
export default notificationsRouter
