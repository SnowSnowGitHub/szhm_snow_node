const path=require('path')
const template = require('art-template');
//导入数据库操作模块
const databasetool=require(path.join(__dirname,'../tools/databasetool.js'))

exports.getStuManagerPage=(req,res)=>{
    const keywords=req.query.keywords || ''

    databasetool.findeMany('studentInfo',{name:{$regex:keywords}},(err,result)=>{
        // console.log(result)
        const html = template(path.join(__dirname,'../public/views/list.html'), {students:result,keywords}) 
        res.send(html)
    })


    //之前的数据库封装
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






