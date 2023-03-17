const express = require('express')
require('dotenv').config({path: "./config.env"})
const route = require('./routes/route')
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.set("strictQuery", false);

//express app 
const app = express();


// middleware
app.use(express.json())
app.use(cors());

//routes
app.use(require('./routes/route'));


// connect to db
mongoose.connect(process.env.MONG_URI)
.then(db =>{
    app.listen(process.env.PORT, () => {
        console.log(`Connected to db & listening on port ${process.env.PORT}`)
    })
}).catch(err =>{
    console.log(err);
})



 