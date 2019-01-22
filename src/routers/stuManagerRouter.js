
const express=require('express')
const path=require('path')
//导入控制模块
const stuManagerController=require(path.join(__dirname,'../controllers/stuManagerController.js'))
const stuManagerRouter=express.Router()

//获取学生管理主页面
stuManagerRouter.get('/list',stuManagerController.getStuManagerPage)
//获取学生添加页面
stuManagerRouter.get('/add',stuManagerController.getStuAddPage)
//提交增加学生请求
stuManagerRouter.post('/add',stuManagerController.addStudent)
//获取修改页面
stuManagerRouter.get("/edit/:studentId",stuManagerController.getEditStuPage);
// 修改学生信息
stuManagerRouter.post("/edit/:studentId",stuManagerController.editStudent);
// 删除一个学生的信息
stuManagerRouter.get("/list/:studentId",stuManagerController.deleteStudent);
module.exports=stuManagerRouter