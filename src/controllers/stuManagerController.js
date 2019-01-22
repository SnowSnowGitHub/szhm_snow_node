const path=require('path')
const template = require('art-template');
//导入数据库操作模块
const databasetool=require(path.join(__dirname,'../tools/databasetool.js'))

//获取后台管理主页面
exports.getStuManagerPage=(req,res)=>{
    const keywords=req.query.keywords || ''

    databasetool.findeMany('studentInfo',{name:{$regex:keywords}},(err,result)=>{
        console.log(result)
        const html = template(path.join(__dirname,'../public/views/list.html'), {students:result,keywords,loginName:req.session.loginName}) 
        res.send(html)
    })


    //之前对数据库的操作
    // const MongoClient = require('mongodb').MongoClient;
    // // Connection URL
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'muzi';
    // MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
    //     console.log("Connected successfully to server");
    //     //操作数据库的一个db对象
    //     const db = client.db(dbName);
    //     // Get the documents collection 拿到要操作的集合
    //     const collection = db.collection('studentInfo');

    //     collection.find({name:{$regex:keywords}}).toArray(function(err, docs) {
    //         console.log(docs)
    //         const html = template(path.join(__dirname,'../public/views/list.html'), {students:docs,keywords})
    //         // console.log(html)
    //         res.send(html)
    //     })
    // })


}

//获取新增学生信息页面
exports.getStuAddPage=(req,res)=>{
    const html = template(path.join(__dirname,'../public/views/add.html'), {loginName:req.session.loginName}) 
    res.send(html)
}


//添加学生信息
exports.addStudent=(req,res)=>{
    // console.log(req.body)
    databasetool.insertSingle('studentInfo',req.body,(err,result)=>{
        // console.log(result)
        if(!result){
            res.send(`<script>alert('插入失败')</script>`)
        }else{
            res.send(`<script>location.href="/stuManager/list"</script>`)
        }
    })
}

//根绝id 获取学生信息编辑页面
exports.getEditStuPage=(req,res)=>{
    console.log(req.params)
    const _id=databasetool.ObjectId(req.params.studentId)
    databasetool.findeSingle('studentInfo',{_id},(err,result)=>{
        result.loginName=req.session.loginName
        const html = template(path.join(__dirname,'../public/views/edit.html'), result) 
        res.send(html)
    })

}

//编辑学生信息(更新数据库)
exports.editStudent=(req,res)=>{
    const _id=databasetool.ObjectId(req.params.studentId)
    databasetool.updateSingle('studentInfo',{_id},req.body,(err,result)=>{
        if(!result){
            res.send(`<script>alert('更新失败')</script>`)
        }else{
            res.send(`<script>location.href="/stuManager/list"</script>`)
        }
    })
}


//删除一个学生的信息
exports.deleteStudent=(req,res)=>{
    const _id=databasetool.ObjectId(req.params.studentId)
    databasetool.deleteSingle('studentInfo',{_id},(err,result)=>{
        if(!result){
            res.send(`<script>alert('删除失败')</script>`)
        }else{
            res.send(`<script>location.href="/stuManager/list"</script>`)
        }
    })
}


