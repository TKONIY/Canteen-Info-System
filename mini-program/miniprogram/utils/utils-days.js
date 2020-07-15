const formatMsgTime = function (dateStr) {
  var dateObj = dateStr.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/')
  var targetDate = new Date(dateObj);
  var year = targetDate.getFullYear();
  var month = targetDate.getMonth() + 1;
  var day = targetDate.getDate();
  var hour = targetDate.getHours();
  var minute = targetDate.getMinutes();
  var second = targetDate.getSeconds();
  var nowDate = new Date();
  var now_new = Date.parse(nowDate.toString());
  var milliseconds = 0;
  var timeSpanStr;
  milliseconds = now_new - targetDate;
  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == nowDate.getFullYear()) {
    timeSpanStr = month + '-' + day;
  } else {
    timeSpanStr = year + '-' + month + '-' + day;
  }
  return timeSpanStr;
}
module.exports = {
  formatMsgTime: formatMsgTime
}