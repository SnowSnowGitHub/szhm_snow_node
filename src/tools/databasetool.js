//封装查询数据库的方法

const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'muzi';

//查询一条数据
const findeSingle=(collectionName,data,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
        //操作数据库的一个db对象
        const db = client.db(dbName);
        // Get the documents collection 拿到要操作的集合
        const collection = db.collection(collectionName);
       
        collection.findOne(data,(err, result)=>{
        // 关闭数据库
        client.close();
        //执行回调函数 传递查询的结果给控制器
        callback(err, result)
      });
    })
}


//查询多条数据
const findeMany=(collectionName,data,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
        //操作数据库的一个db对象
        const db = client.db(dbName);
        // Get the documents collection 拿到要操作的集合
        const collection = db.collection(collectionName);
       
        collection.find(data).toArray(function(err, docs) {
            // 关闭数据库
            client.close();
            //执行回调函数 传递查询的结果给控制器
            callback(err,docs);
          });
    })
}


//插入一条数据
const insertSingle=(collectionName,data,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
        //操作数据库的一个db对象
        const db = client.db(dbName);
        // Get the documents collection 拿到要操作的集合
        const collection = db.collection(collectionName);
       
        collection.insertOne(data,(err, result)=>{
        // 关闭数据库
        client.close();
        //执行回调函数 传递查询的结果给控制器
        callback(err, result)
      });
    })
}




module.exports={
    findeSingle,
    insertSingle,
    findeMany
}