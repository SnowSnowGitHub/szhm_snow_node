/*
    注册和登录的处理
        导包
        创建路由对象
        导入控制器模块
        获取注册页面的请求
        导出路由对象
*/



const express=require('express')
const path=require('path')
//创建路由
const accountRouter=express.Router()
//导入控制模块
const accountController=require(path.join(__dirname,'../controllers/acountController.js'))

accountRouter.get('/register',accountController.getRegisterPage)
accountRouter.post('/register',accountController.register)

//导出路由
module.exports=accountRouter







//练习
// const express=require('express')
// const path=require('path')
// const accountRouter=express.Router()
// const accountController=require(path.join(__dirname,'../controllers/acountController.js'))

// accountRouter.get('/register',accountController.getRegisterPage)

// module.exports=accountRouter