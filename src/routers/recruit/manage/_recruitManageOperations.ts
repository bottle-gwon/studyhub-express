import fs from 'fs'
import type { Manage } from '@/interfaces/_recruitManageInterfaces.js'
import dummyRecruitManage from './dummy/_dummyRecruitManageList.js'

export const updateDummyRecruitManage = (targetRecruitManage: Manage) => {
  const newArray = dummyRecruitManage.map((manage) =>
    manage.id === targetRecruitManage.id ? targetRecruitManage : manage
  )

  const newContent = `import type { Manage } from "@/interfaces/_recruitManageInterfaces.js"

const dummyRecruitManage :Manage[] = ${JSON.stringify(newArray, null, 2)}
export default dummyRecruitManage`

  const path = [
    process.cwd(),
    '/scr/routers/recruit/manage/dummy/_dummyRecruitManageList.ts',
  ].join('')
  console.log({ path })

  fs.writeFileSync(path, newContent, 'utf8')
}
