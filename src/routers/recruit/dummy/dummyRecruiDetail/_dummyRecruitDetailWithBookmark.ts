import type { RecruitDetail } from '@/interfaces/_recruitInterfaces.js'
import dummyRecruitDetailBase from './_dummyRecruitDetailBase.js'

const dummyRecruitDetailWithBookmark: Omit<RecruitDetail, 'author_nickname'> = {
  ...dummyRecruitDetailBase,
  is_bookmarked: false,
}

export default dummyRecruitDetailWithBookmark
