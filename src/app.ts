import express from 'express'
import cors  from 'cors' 
import dotenv from "dotenv";
import './connect/connect'

const port = process.env.PORT || 8000
const app = express()
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors())
///////IMPORTS PAGES
const auth = require('./controllers/auth.controllers')
const Data = require('./routers/Data')

app.use(auth)
app.use('/data',Data)

app.get('/', (req: any, res: any) => {
    res.json({welcome:'whil'})
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });

  //    "dev": "nodemon src/app.ts",