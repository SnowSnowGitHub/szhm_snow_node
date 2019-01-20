const express=require('express')
const path=require('path')

//导入路由
const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'))
const app=express()

app.use('/account',accountRouter)
app.use(express.static(path.join(__dirname,'public')))

app.listen(4000,'127.0.0.1',err=>{
    if(err) console.log(err)
    console.log('start ok')
})


//练习
// const express=require('express')
// const path=require('path')
// const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'))
// const app=express()
//设置静态资源
// app.use(express.static(path.join(__dirname,'public')))
// app.use('/account',accountRouter)
// app.listen(4000,'127.0.0.1',err=>{
//     if(err) console.log(err)
//     console.log('start ok')
// })