const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

app.use(express.urlencoded({extended: true}));
app.use(express.json())

//import Routes
const postsRouter = require('./routers/posts')

app.use('/posts',postsRouter)

//
app.get('/posts', (req, res) => {
    res.send('we are on posts')

})

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true }
    , () => {
        console.log('conectado a la db')
    })
app.listen(3000)

//newuser1 
//JYBmv4YHnOnKsrh2