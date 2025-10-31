import express from 'express'
import cors, { type CorsOptions } from 'cors'
import healthRouter from './routers/healthRouter.js'

const app = express()
app.use(express.json())
app.use(express.text())

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173'],
  methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'DELETE'],
}
app.use(cors(corsOptions))
// app.use("/health", healthRouter);
// app.use("/auth", progressRouter);
// app.use("/users", reviewCheckRouter);
app.use('/', healthRouter)

app.listen(3000, () => console.log('----server is on 3000'))
