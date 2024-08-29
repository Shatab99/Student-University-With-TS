import express, { Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/Utils/globalErrorHandler'
import router from './app/modules/Routers/index.router'
import cookieParser from 'cookie-parser'
const app = express()

//parser 

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

//routes 

app.use('/api/v1', router)


// Global error  handling 

app.use(globalErrorHandler)

export default app 
