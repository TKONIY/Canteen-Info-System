const cfg = require("../control/config.js");


/**
 * 用0填补,虽然是异步函数,但是感觉可以return
 * @param {string} str 
 * @param {final-length} length 
 * @ret {string} 
 */
function padding(str, length) {
    if (length <= str.length) {
        return str;
    } else {
        return ('0'.repeat(length - str.length) + str);
    }
}


/**
 * 
 * @param {string:2018/05/20} dateString 
 * @param {number} subtract 
 * @param {string:2018/05/10} callback 
 */
function dateMinus(dateString, subtract, callback) {
    /** --月数和在数组的下标需要-1
     * [[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],  -----闰年,%4=0, cld[0]
     *  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
     *  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],   
     *  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]]   
     *  当前的日期要-1，但是日历不用减，比如今天是2月10号,10天前则是(10-1)-10 = -1
     *  31 +(-1) = 30, 恰好也是正确日期-1
     *  最后将30+1就是正确结果啦
     */
    const dateReg = /(\d+)\/(\d+)\/(\d+)/;
    const dateRes = dateReg.exec(dateString);

    const cld = cfg.calendar;
    const yInd = dateRes[1] % 4;
    const mInd = dateRes[2] - 1;
    const dInd = dateRes[3] - 1; //输出日期是需要加上去

    let minusDays = dInd - subtract;//循环直到minusDay>0为止
    let year = dateRes[1];

    (function loop(y, m) {
        if (minusDays >= 0) {
            callback( //new date string
                padding(year.toString(), 4) +
                padding((m + 1).toString(), 2) +
                padding((minusDays + 1).toString(), 2)
            );
            return;
        } else {
            if (m == 0) {//跨年
                y = (y + 4 - 1) % 4;
                year -= 1;
            }
            m = (m + 12 - 1) % 12;
            minusDays = minusDays + cld[y][m];
            loop(y, m)
        }
    })(yInd, mInd)
}

exports.dateMinus = dateMinus;
exports.padding = padding;

dateMinus("2020/02/29", 1088, () => { });
// console.log(padding("1", 2));