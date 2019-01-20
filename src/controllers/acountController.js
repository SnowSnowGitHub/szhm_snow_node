/*
    module.exports={
        getRegisterPage:箭头函数
    }
    导出一个方法 该方法 获取注册页面


*/
const path=require('path')
exports.getRegisterPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}









//练习
// const path=require('path')
// exports.getRegisterPage=(req,res)=>{
//     res.send('<h1>我是注册页面</h1>')
// }