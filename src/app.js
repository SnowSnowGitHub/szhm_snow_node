const express=require('express')
const path=require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const app=express()

//使用session
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(session({
    secret: 'keyboard cat',//加密字符串也可以写数组 用来对session id相关的cookie进行签名
    resave: false,//是否每次都重新保存会话  建议设置成false
    saveUninitialized: true,  //是否自动保存未初始化的会话的内容
    cookie: { maxAge: 600000 }  //保存的时效 
  }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//设置静态资源文件根目录
app.use(express.static(path.join(__dirname,'public')))

//导入路由对象  路由中间件要写在最后
const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'))
const stuManagerRouter=require(path.join(__dirname,'routers/stuManagerRouter.js'))
app.use('/account',accountRouter)
app.use('/stuManager',stuManagerRouter)



app.listen(4000,'127.0.0.1',err=>{
    if(err) console.log(err)
    console.log('start ok')
})




//练习
// const express=require('express')
// const path=require('path')
// const bodyParser=require('body-parser')
// const session=require('express-session')
// const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'))
// const app=express()
// //解析 
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
// //使用session
// app.use(session({
//     secret: 'keyboard cat',//加密字符串也可以写数组 用来对session id相关的cookie进行签名
//     resave: false,//是否每次都重新保存会话  建议设置成false
//     saveUninitialized: true,  //是否自动保存未初始化的会话的内容
//     cookie: { maxAge: 600000 }  //保存的时效
//   }))

// // 设置静态资源
// app.use(express.static(path.join(__dirname,'public')))

// app.use('/account',accountRouter)
// app.listen(4000,'127.0.0.1',err=>{
//     if(err) console.log(err)
//     console.log('start ok')
// })