//DAO层，记得每个操作都要db.close()或client.close()
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const config = require("../control/config.js")

//每当被require的时候建立索引，初始化数据库
function init() {
    connectClient((client) => {
        var db = client.db(config.db);
        var colluser = db.collection(config.coll.user);//为user创建索引
        colluser.createIndex(
            { username: 1 },
            { unique: true },
            (err, result) => {
                assert.equal(null, err);
                console.log(result);
            }
        )
    })
}


//连接数据库client不暴露给外部，供内部增删改查使用
function connectClient(callback) {
    var url = "mongodb://localhost:27017";
    var client = new MongoClient(url, { useUnifiedTopology: true });

    client.connect(function (err) {
        assert.equal(null, err);
        callback(client);//返回client.db给回调函数
    })
}

//插入数据D
//cb=>err,result
exports.insertOne = function (dbName, collectionName, json, callback) {
    connectClient(function (client) {//回调函数接收client对象
        var db = client.db(dbName);//获取db
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err, result);//插入一条数据，返回err和result
            client.close();//关闭数据库
        });
    })
}

exports.insertOneNotClose = function (dbName, collectionName, json, callback) {
    connectClient(function (client) {//回调函数接收client对象
        var db = client.db(dbName);//获取db
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err, result);//插入一条数据，返回err和result
            // client.close();//关闭连接
        });
    })
}

//find一个collection下的分页的docs(filter={})/部分doc
//cb=>err,docs
exports.find = function (dbName, collectionName, filter, args, callback) {

    //args= {pageamount, page}每页的条目数,第几页，find函数读取这一页的数据返回
    if (JSON.stringify(args) == '{}') {//传空的参数表示读全部
        var skip = 0;
        var limit = 0;
    }
    else {
        var skip = args.pageamount * args.page;
        var limit = args.pageamount;
    }

    connectClient(function (client) {//连接client
        //获取db和collection
        var db = client.db(dbName);
        var collection = db.collection(collectionName);
        //将结果作为数组传回callback
        collection.find(filter)
            .skip(skip)
            .limit(limit)
            .toArray(function (err, docs) {
                callback(err, docs);//传回docs
                client.close();//close()
            })
    })
}

//删除
//cb=>err, result
exports.deleteMany = (dbName, collectionName, filter, callback) => {
    connectClient((client) => {
        var db = client.db(dbName);
        var collection = db.collection(collectionName);
        //根据filter删除
        collection.deleteMany(filter, (err, result) => {
            callback(err, result);
            client.close();
        })
    })
}

//修改
//cb=>err,result
exports.update = function (dbName, collectionName, selector, update, options, callback) {
    connectClient(function (client) {
        var db = client.db(dbName);
        var collection = db.collection(collectionName);
        // 进行修改
        collection.update(selector, update, options, function (err, result) {
            callback(err, result);
            client.close()
        })
    })
}