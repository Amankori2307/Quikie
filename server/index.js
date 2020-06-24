const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const {MONGO_URI} = require('./conf');

const app = express();

mongoose.connect(MONGO_URI,{useFindAndModify:false,useNewUrlParser : true,useUnifiedTopology:true, useCreateIndex:true},(err) => {
    if(err) console.log("Not Connected to MongoDB")
    else console.log("Connected to MongoDB")
})
app.use(express.json());

const uploadRouter = require('./routes/upload');
app.use('/upload',uploadRouter);


app.use(express.static(path.join(__dirname,'..','uploads')))

// For production
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'..','client','build','index.html'))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if(err) console.log("Error has occoured")
    else console.log(`Listening to port ${port}`)
})