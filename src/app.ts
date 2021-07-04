import express from 'express'
import cors  from 'cors' 
import './connect/connect'
import dotenv from "dotenv";

const port = process.env.PORT || 8000
const app = express()
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors())

//import Routes
const RegisterUser = require('./routers/register')
const postsRouter = require('./routers/posts')
const DataRouter = require('./routers/Data')

app.use('/register',RegisterUser)
app.use('/posts',postsRouter)
app.use('/data',DataRouter)

//main
app.get('/', (req: any, res: any) => {
    res.json({welcome:'whil'})
})

app.listen(port)
//    "dev": "nodemon src/app.ts",