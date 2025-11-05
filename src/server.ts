import express from 'express'
import cors from 'cors'
// NOTE: 임포트는 항상 js로 해주세요
import lecturesRouter from './routers/lectures/lecturesRouter.js'
import healthRouter from './routers/health/healthRouter.js'
import recruitRouter from './routers/recruit/recruitRouter.js'

const app = express()
app.use(express.json())
app.use(express.text())

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// NOTE: 사용하실 라우터를 만들어 여기에 부착하시면 됩니다
// NOTE: `/src/lectures/lecturesRouter`를 참고해주세요

// NOTE: `/lectures`로 시작하는 엔드포인트들은 모두 lecturesRouter로 넘어갑니다.
// NOTE:  넘어간 이후엔 `/lectures`를 제외한 엔드포인트만 쓰시면 됩니다
app.use('/lectures', lecturesRouter)
app.use('/recruitments', recruitRouter)
app.use('/', healthRouter) // NOTE: 이 라우터는 가장 마지막에 있어야 합니다

app.listen(3000, () => console.log('----server is on 3000'))
