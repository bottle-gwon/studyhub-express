import express from 'express'
import { sleep } from '../utils/sleep.js'
import dummyStudyGroups from './_dummyStudyGroups.js'

const studiesRouter = express.Router()

studiesRouter.get('/groups', async (_req, res) => {
  // NOTE: 스켈레톤 확인용입니다
  await sleep(1000)

  res.status(200).json(dummyStudyGroups)
})

export default studiesRouter
