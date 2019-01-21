
const express=require('express')
const path=require('path')
//导入控制模块
const stuManagerController=require(path.join(__dirname,'../controllers/stuManagerController.js'))
const stuManagerRouter=express.Router()

//获取学生管理主页面
stuManagerRouter.get('/parent',stuManagerController.getStuManagerPage)

module.exports=stuManagerRouter