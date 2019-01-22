/*
    module.exports={
        getRegisterPage:箭头函数
    }
    导出一个方法 该方法 获取注册页面


*/
const path=require('path')
//导入数据库操作模块
const databasetool=require(path.join(__dirname,'../tools/databasetool.js'))

exports.getRegisterPage=(req,res)=>{
    //内部就是对 fs.readFile 的封装
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}

exports.register=(req,res)=>{
    const resultRegister={
        status:0,
        message:'注册成功'
    }

    //拿到浏览器传递过来的数据 
    const {username,password}=req.body
    databasetool.findeSingle('accountInfo',{username},(err,result)=>{
        //如果result1==null表示没有查询到, 就可以插入  如果查询到了就说明用户名已经存在
            // console.log(result1)
            if(result){
                resultRegister.status=1,
                resultRegister.message="用户名已经存在"

                res.json(resultRegister)
            }else{
                databasetool.insertSingle('accountInfo',req.body,(err,result)=>{
                    // 这里的result 如果有值就表示插入成功 如果没有值就表示插入失败
                    // console.log(result)
                    if(!result){
                        resultRegister.status=2,
                        resultRegister.message="注册失败"
                    }

                    res.json(resultRegister)
                })
            }
    })


    //之前操作数据库的方法
    // const MongoClient = require('mongodb').MongoClient;
    // // Connection URL
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'muzi';
    // MongoClient.connect(url,{ useNewUrlParser: true },function (err, client) {
    //     console.log("Connected successfully to server");
    //     //操作数据库的一个db对象
    //     const db = client.db(dbName);
    //     // Get the documents collection 拿到要操作的集合
    //     const collection = db.collection('accountInfo');

    //     collection.findOne({username},(err, result1)=>{
    //         //如果result1==null表示没有查询到, 就可以插入  如果查询到了就说明用户名已经存在
    //         // console.log(result1)
    //         if(result1){
    //             result.status=1,
    //             result.message="用户名已经存在"
    //             //关闭数据库连接
    //             client.close();
    //             res.json(result)
    //         }else{
    //             //如果用户名不存在 插入到数据库中
    //             collection.insertOne(req.body,(err,result2)=>{
    //                 // 这里的result 如果有值就表示插入成功 如果没有值就表示插入失败
    //                 console.log(result2)
    //                 if(!result2){
    //                     result.status=2,
    //                     result.message="注册失败"
    //                 }
    //                 client.close();
    //                 res.json(result)
    //               })
    //         }
    //     });

    // })

}

exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/views/login.html'))
}

//导入第三方包 captchapng 生成带有数字的验证码
const captchapng = require('captchapng');
exports.getVcode=(req,res)=>{
    const vcode=parseInt(Math.random()*9000+1000)
    req.session.vcode=vcode
    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
        var img = p.getBase64();
        var imgbase64 = Buffer.from(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
}



exports.login=(req,res)=>{
    const resultLogin={
        status:0,
        message:"登录成功"
    }
    //在这里把浏览器传递过来的 用户名 用户密码 验证码(和req.session.vcode中的验证码对比)
    const vcodeImg=req.session.vcode
    const {username,password,vcodeInput}=req.body
    // console.log(vcodeImg,vcodeInput)
    if(vcodeImg!=vcodeInput){
        resultLogin.status=1
        resultLogin.message="验证码错误"
        res.json(resultLogin)
    }else{
        databasetool.findeSingle('accountInfo',{username,password},(err,result)=>{
            if(!result){
                resultLogin.status=2
                resultLogin.message="用户名或密码错误"   
            }else{
                req.session.loginName=username
            }
            res.json(resultLogin)
        })


        //之前数据库操作
        // MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
        //     console.log("Connected successfully to server");
        //     //操作数据库的一个db对象
        //     const db = client.db(dbName);
        //     // Get the documents collection 拿到要操作的集合
        //     const collection = db.collection('accountInfo');
           
        //     collection.findOne({username,password},(err, result3)=>{
        //     console.log(result3)
        //     if(!result3){
        //         resultLogin.status=2
        //         resultLogin.message="用户名或密码错误"   
        //     }
        //     client.close();
        //     res.json(resultLogin)
        //   });
        //   })
          
    }
    
}

exports.getStuManagerPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/views/parent.html'))
}

// 注销的操作
exports.loginout=(req,res)=>{
    //清空session的用户名
    req.session.loginName=null
    //需要浏览器跳转到登录页面
    res.send(`<script>location.href="/account/login"</script>`)
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