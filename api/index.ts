import express from 'express';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let port  = process.env.PORT || 3000
app.listen(port, ()=>{console.log(`Listening on Port ${port}`)})