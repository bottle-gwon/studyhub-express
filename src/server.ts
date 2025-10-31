import express from 'express'
import cors from 'cors'
import healthRouter from './routers/healthRouter.js'

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
// app.use("/users", reviewCheckRouter);
app.use('/', healthRouter) // 마지막에 있어야 합니다

app.listen(3000, () => console.log('----server is on 3000'))
