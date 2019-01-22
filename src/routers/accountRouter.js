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

//获取注册页面
accountRouter.get('/register',accountController.getRegisterPage)
//获取注册页面请求
accountRouter.post('/register',accountController.register)
//获取登录页面
accountRouter.get('/login',accountController.getLoginPage)
//获取验证码
accountRouter.get('/vcode',accountController.getVcode)
//获取登录页面请求
accountRouter.post('/login',accountController.login)
//退出登录请求
accountRouter.get('/loginout',accountController.loginout)
//导出路由
module.exports=accountRouter







//练习
// const express=require('express')
// const path=require('path')
// const accountRouter=express.Router()
// const accountController=require(path.join(__dirname,'../controllers/acountController.js'))

// accountRouter.get('/register',accountController.getRegisterPage)

// module.exports=accountRouter