const express=require('express')

const app=express()

app.get('/',(req,res)=>{
    res.send('<h1>hello world</h1>')
})

app.listen(4000,'127.0.0.1',err=>{
    if(err) console.log(err)
    console.log('start ok')
})