const padding = require("./util.js").padding;



//为Date对象添加功能
//TODO 将加法减法写在这个类里面

/**
 * @returns {a pack of string date and time.}
 */
Date.prototype.toFullLocaleDateTime = function () {

  return new Promise((resolve, reject) => {

    const lds = this.toLocaleDateString();
    const lts = this.toLocaleTimeString();

    const dateReg = /(\d+)\/(\d+)\/(\d+)/;
    const dateRes = dateReg.exec(lds);

    const year = padding(dateRes[1], 4);
    const month = padding(dateRes[2], 2);
    const day = padding(dateRes[3], 2);//如果需要添加星期再用weekday吧

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

    resolve(pack);
  });


}


module.exports = Date;