import type { NotificationsResponseData } from '@/interfaces/index.js'
import express from 'express'
import dummyNotifications from './_dummyNotifications.js'

const notificationsRouter = express.Router()

notificationsRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 1)

  const baseUrl = '----not-that-important----/notifications/?page='
  const previous = page === 1 ? null : `${baseUrl}${page - 1}`
  const next = `${baseUrl}${page + 1}`

  const response: NotificationsResponseData = {
    count: 100,
    previous,
    next,
    results: dummyNotifications,
  }

  res.status(200).json(response)
})

export default notificationsRouter
