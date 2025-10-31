import express from 'express'
import cors from 'cors'
// NOTE: 임포트는 항상 js로 해주세요
import healthRouter from './routers/healthRouter.js'
import lecturesRouter from './routers/lectures/lecturesRouter.js'

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
// app.use("/health", healthRouter);
// app.use("/auth", progressRouter);
app.use('/lectures', lecturesRouter) // lectures router 안의 라우트들은 `/lectures`를 떼고 쓰면 됩니다
app.use('/', healthRouter) // 마지막에 있어야 합니다

app.listen(3000, () => console.log('----server is on 3000'))
