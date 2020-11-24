const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
var http = require("http");
var logger = require("morgan");
const apiRoutes=require('./routes/routes')
const dotenv = require("dotenv");
dotenv.config();


//DATABASE CONNECTIVITY
mongoose.connect('mongodb://localhost:27017/excellence', 
{ useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
.then( ()=>{
    console.log("DB Connected")
})
.catch( (err)=>{
    console.log("DB not Connected")
})


const PORT = 1230 || process.env.PORT;
const app=express();
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }))

// APIS

app.use('/api',apiRoutes);

app.use('/',(req,res)=>{
    console.log("hello")
})
//SEVER LISTEN
var server = http.createServer(app);
server.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})


