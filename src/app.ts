import express, { Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/Utils/globalErrorHandler'
import router from './app/modules/Routers/index.router'
const app = express()

//parser 

app.use(express.json())
app.use(cors())


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

//student routes 

app.use('/api/v1', router)




// Global error  handling 

app.use(globalErrorHandler)

export default app 
