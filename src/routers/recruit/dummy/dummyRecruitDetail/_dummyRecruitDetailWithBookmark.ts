import type { RecruitDetail } from '@/interfaces/_recruitInterfaces.js'
import dummyRecruitDetailBase from './_dummyRecruitDetailBase.js'
import dummyRecruitDetailBookmark from './_dummyRecruitDetailBookmark.js'

const dummyRecruitDetailWithBookmark: Omit<RecruitDetail, 'author_nickname'> = {
  ...dummyRecruitDetailBase,
  ...dummyRecruitDetailBookmark,
}

export default dummyRecruitDetailWithBookmark
