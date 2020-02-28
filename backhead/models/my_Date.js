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
    return('0'.repeat(length - str.length) + str);
  }
}

//为Date对象添加功能


/**
 * @returns {a pack of string date and time.}
 */
Date.prototype.toFullLocaleDateTime = function (callback) {

  const lds = this.toLocaleDateString();
  const lts = this.toLocaleTimeString();

  const dateReg = /(\d+)\/(\d+)\/(\d+)/;
  const dateRes = dateReg.exec(lds);

  const year = padding(dateRes[1], 4);
  const month = padding(dateRes[2], 2);
  const day = padding(dateRes[3],2);//如果需要添加星期再用weekday吧

  const hour = padding(this.getHours().toString(), 2);
  const minute = padding(this.getMinutes().toString(), 2);
  const second = padding(this.getSeconds().toString(), 2);

  const pack = {

    originDate: lds,
    fullDate: year + '/' + month + '/' + day,
    year: year,
    month: month,
    day: day,

    originTime: lts,
    fullTime: hour + ':' + minute + ':' + second,
    hour: hour,
    minute: minute,
    second: second
  };

  callback(pack);
}


module.exports = Date;