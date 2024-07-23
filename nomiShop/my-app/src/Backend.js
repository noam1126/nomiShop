const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const PORT=5000

app.use(cors())
app.use(express.json())

const URI='mongodb+srv://milisegal123:nomi2468@cluster.loiazet.mongodb.net/'
mongoose.connect(URI,{useNewUrlParser:true,useUnifieldTopology:true})
.then(()=>console.log('mongoDB connect'))
.cath(err=>console.log(err));



