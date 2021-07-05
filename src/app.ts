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

const auth = require('./controllers/auth.controllers')

app.use(auth)

app.get('/', (req: any, res: any) => {
    res.json({welcome:'whil'})
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });