const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors())

//import Routes
const postsRouter = require('./routers/posts')

app.use('/posts', postsRouter)

//
app.get('/', (req, res) => {
    res.send('main page')

})

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  };
  
  mongoose.connect(process.env.DB_CONNECTION, dbOptions);
  
  const connection = mongoose.connection;
  
  connection.once("open", () => {
    console.log("mongodb conect");
  });
  
  connection.on("warning", (e) => console.warn(e.stack));

app.listen(port)

