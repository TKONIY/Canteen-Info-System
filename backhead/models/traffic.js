const mongoose = require("mongoose");

const db = require("./db.js"); //连接好的db
const padding = require("../models/util.js").padding;
const dateMinus = require("../models/util.js").dateMinus;

const trafficSchema = new mongoose.Schema(
    {
        stamp: {
            type: String,
            unique: true,
            index: true
        },

        date: String,
        hour: Number,
        minute: Number,
        second: Number,

        flow: Number,
        location: String,
        cam: Number
    },
    { collection: "traffic" }
);

/**
 * 寻找最近一段时间的所有记录
 * @param {<60} second
 * @callback {err, docs}
 */
trafficSchema.statics.findRecentFlows = function (period, callback) {
    const that = this;
    /**
     * @param {query}callback
     */
    (function countQuery(callback) {
        (new Date()).toFullLocaleDateTime().then((pack) => {
            //仅使用一个query,使用stamp查询

            if (parseInt(pack.second) >= period) {
                const date = pack.fullDate;
                const hour = pack.hour;
                const minute = pack.minute;
                const second = padding((parseInt(pack.second) - period).toString(), 2);

                //仅使用query1查找
                const query = { stamp: { $gte: date + '-' + hour + ':' + minute + ':' + second } };
                callback(query);

            } else {
                //计算query
                const second = padding((60 + parseInt(pack.second) - period).toString(), 2);
                if (parseInt(pack.minute) > 0) { //如果分钟不为0,则hour和date不用减
                    const date = pack.fullDate;
                    const hour = pack.hour;
                    const minute = padding((parseInt(pack.minute) - 1).toString(), 2);

                    //查找
                    const query = { stamp: { $gte: date + '-' + hour + ':' + minute + ':' + second } };
                    callback(query);

                } else {//如果hour>0，则date不用减
                    const minute = "59";
                    if (parseInt(pack.hour) > 0) {//日
                        const hour = padding((parseInt(pack.hour) - 1).toString(), 2);
                        const date = pack.date;

                        //查找
                        const query = { stamp: { $gte: date + '-' + hour + ':' + minute + ':' + second } };
                        callback(query);

                    } else {//后面要对日期做减法，好复杂，写到util里面去吧
                        const hour = "23";
                        dateMinus(pack.date, 1, (res) => {
                            const date = res;

                            //查找
                            const query = { stamp: { $gte: date + '-' + hour + ':' + minute + ':' + second } };
                            callback(query);
                        })
                    }
                }
            }
        })
    })((query) => {
        //查询
        console.log(query);//debug
        that.find(
            query, null,
            { sort: { stamp: -1 } },
            (err, docs) => {
                callback(err, docs);
            }
        )
    })
}

const Traffic = db.model("traffic", trafficSchema);
module.exports = Traffic;