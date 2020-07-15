function getDateDiff(dateTime) {
  let dateTimeStamp = new Date(dateTime).getTime();
  let result = '';
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let year = day * 365;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  let monthEnd = diffValue / month;
  let weekEnd = diffValue / (7 * day);
  let dayEnd = diffValue / day;
  let hourEnd = diffValue / hour;
  let minEnd = diffValue / minute;
  let yearEnd = diffValue / year;
  if (yearEnd >= 1) {
    result = dateTime;
  } else if (monthEnd >= 1) {
    result = "" + parseInt(monthEnd) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekEnd) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayEnd) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourEnd) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minEnd) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};


module.exports = {
  getDateDiff: getDateDiff
}