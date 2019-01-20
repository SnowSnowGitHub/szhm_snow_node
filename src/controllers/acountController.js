/*
    module.exports={
        getRegisterPage:箭头函数
    }
    导出一个方法 该方法 获取注册页面


*/
const path=require('path')
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'muzi';


exports.getRegisterPage=(req,res)=>{
    //内部就是对 fs.readFile 的封装
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}

exports.register=(req,res)=>{
    const result={
        status:0,
        message:'注册成功'
    }

    const {username,password}=req.body
    MongoClient.connect(url, function (err, client) {
        console.log("Connected successfully to server");
        //操作数据库的一个db对象
        const db = client.db(dbName);
        // Get the documents collection 拿到要操作的集合
        const collection = db.collection('accountInfo');

        collection.findOne({username},(err, docs)=>{
            // console.log(docs)
            if(docs){
                result.status=1,
                result.message="用户名已经存在"

                //关闭数据库连接
                client.close();
                res.json(result)
            }else{
                collection.insertOne(req.body,(err,result)=>{
                    if(result){
                        result.status=2,
                        result.message="注册失败"
                        //关闭数据库连接
                        client.close();
                        res.json(result)
                    }
                  })
            }
        });

    })

}







/*

const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'muzi';


//连接
MongoClient.connect(url, function (err, client) {
  console.log("Connected successfully to server");
  //操作数据库的一个db对象
  const db = client.db(dbName);
  // Get the documents collection 拿到要操作的集合
  const collection = db.collection('food');

  collection.insertMany([{
    "name":"米饭",
    "price":100
  }, {
    "name":"龙虾",
    "price":10000
  }, {
    "name":"火锅",
    "price":100
  }], function (err, result) {
    console.log(result)
  });

  collection.insertOne({
    "name":"牛排",
    "price":200
  },(err,result)=>{
    console.log(result)
  })

  collection.find({}).toArray(function(err, docs) {
    console.log(docs)
  });

  collection.find({'price': {$gt:100}}).toArray(function(err, docs) {
    console.log(docs)
  });

  collection.updateOne(
    { name: "米饭"},
    {$set: { name : "澳洲大龙虾" }},
    (err, result) => {
      console.log(result);
    }
  );


  collection.updateMany(
    { price: {$lt:200}},
    {$set: { price : 9999 }},
    (err, result) => {
      console.log(result);
    }
  );


  collection.deleteOne({name:'龙虾'},(err,result)=>{
    console.log(result)
})
  //关闭数据库连接
  client.close();
});


*/






























//练习
// const path=require('path')
// exports.getRegisterPage=(req,res)=>{
//     res.send('<h1>我是注册页面</h1>')
// }