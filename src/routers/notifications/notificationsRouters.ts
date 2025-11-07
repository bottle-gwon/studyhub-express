import type { NotificationsResponseData } from '@/interfaces/index.js'
import express from 'express'
import dummyNotifications from './_dummyNotifications.js'
import fs from 'fs'

const notificationsRouter = express.Router()

notificationsRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 1)
  const is_read = req.query.is_read
    ? req.query.is_read === 'true'
      ? true
      : false
    : null

  const filteredDummy = dummyNotifications.filter((notification) =>
    is_read === null ? true : notification.is_read === is_read
  )

  const baseUrl = `----not-that-important----/notifications/?is_read=${is_read ? is_read : ''}&page=`
  const previous = page === 1 ? null : `${baseUrl}${page - 1}`
  const next = page > 5 ? null : `${baseUrl}${page + 1}`

  const response: NotificationsResponseData = {
    count: filteredDummy.length,
    previous,
    next,
    results: filteredDummy,
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
