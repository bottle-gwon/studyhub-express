import fs from 'fs'
import type { Lecture } from '@/interfaces/_lecturesInterfaces.js'
import dummyLectures from './dummy/_dummyLectures.js'

export const updateDummyLectures = (targetLecture: Lecture) => {
  const newArray = dummyLectures.map((lecture) =>
    lecture.uuid === targetLecture.uuid ? targetLecture : lecture
  )

  const newContent = ` import { penguinImageUrl } from '../../../constants/imageUrls.js'
import { lectureUrl } from '../../../constants/linkUrls.js'
import type { Lecture } from '../../../interfaces/_lecturesInterfaces.js'

const dummyLectures: Lecture[] = ${JSON.stringify(newArray, null, 2)}

export default dummyLectures `

  const path = [
    process.cwd(),
    '/src/routers/lectures/dummy/_dummyLectures.ts',
  ].join('')
  console.log({ path })

  fs.writeFileSync(path, newContent, 'utf8')
}
