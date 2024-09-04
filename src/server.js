const express = require('express')
const moongose = require('moongose')

const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/',(req,res) =>{
    res.send('API REST ESTA FUNCIONANDO')
})

app.listen(port, ()=>{
    console.log(`Servidor esta rodando http://localhost:${port}`)
})