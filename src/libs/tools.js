export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return;
  let i = -1;
  let len = arr.length;
  while (++i < len) {
    let item = arr[i];
    fn(item, i, arr);
  }
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length);
  let i = -1;
  let res = [];
  while (++i < len) {
    const item = arr2[i];
    if (arr1.indexOf(item) > -1) res.push(item);
  }
  return res;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1);
};

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp);
  return timeStr.length > 10;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime;
};

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num;
};

/**
 * 获取当前时间
 */
export const getDateTime = () => {
  let date = new Date();
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  let strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let currentdate = date.getFullYear() + '年' + month + '月' + strDate +
    '日 ';
  return currentdate;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000);
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const date = getHandledValue(d.getDate());
  const hours = getHandledValue(d.getHours());
  const minutes = getHandledValue(d.getMinutes());
  const second = getHandledValue(d.getSeconds());
  let resStr = '';
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second;
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes;
  return resStr;
};

/**
 * 时间格式2019-06-27T16:00:00.000Z转换为北京时间
 */
export const switchTimeFormat = (time) => {
  let timeDate = '';
  if (time !== '' && time !== null) {
    let dateTime = new Date(time);
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let date = dateTime.getDate();
    let addZero = (v) => {
      return v < 10 ? '0' + v : v;
    };
    timeDate = year + '-' + addZero(month) + '-' + addZero(date);
  } else {
    timeDate = '';
  }
  return timeDate;
};

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp);
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000);
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp);
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000);
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime);
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp;
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff;
  let resStr = '';
  const dirStr = IS_EARLY ? '前' : '后';
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr;
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr;
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr;
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr;
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp);
  else resStr = getDate(timeStamp, 'year');
  return resStr;
};

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1;
  };
  if (isExplorer('MSIE')) return 'IE';
  else if (isExplorer('Firefox')) return 'Firefox';
  else if (isExplorer('Chrome')) return 'Chrome';
  else if (isExplorer('Opera')) return 'Opera';
  else if (isExplorer('Safari')) return 'Safari';
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj;
  else {
    let keysArr = Object.keys(obj);
    return keysArr.length;
  }
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) return false;
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
};

/**
 * @description 获取当前农历
 */
const lunar = {
  tg: '甲乙丙丁戊己庚辛壬癸',
  dz: '子丑寅卯辰巳午未申酉戌亥',
  number: '一二三四五六七八九十',
  year: '鼠牛虎兔龙蛇马羊猴鸡狗猪',
  month: '正二三四五六七八九十冬腊',
  monthadd: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  calendar: [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95]
};
export const getLunarDate = (date) => {
  let year, month, day;
  if (!date) {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
  } else {
    date = date.split('-');
    year = parseInt(date[0]);
    month = date[1] - 1;
    day = parseInt(date[2]);
  }
  if (year < 1921 || year > 2020) {
    return {};
  }
  let total, m, n, k, bit, lunarYear, lunarMonth, lunarDay;
  let isEnd = false;
  let tmp = year;
  if (tmp < 1900) {
    tmp += 1900;
  }
  total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + lunar.monthadd[month] + day - 38;
  if (year % 4 === 0 && month > 1) {
    total++;
  }
  for (m = 0; ; m++) {
    k = (lunar.calendar[m] < 0xfff) ? 11 : 12;
    for (n = k; n >= 0; n--) {
      bit = (lunar.calendar[m] >> n) & 1;
      if (total <= 29 + bit) {
        isEnd = true;
        break;
      }
      total = total - 29 - bit;
    }
    if (isEnd) break;
  }
  lunarYear = 1921 + m;
  lunarMonth = k - n + 1;
  lunarDay = total;
  if (k === 12) {
    if (lunarMonth === Math.floor(lunar.calendar[m] / 0x10000) + 1) {
      lunarMonth = 1 - lunarMonth;
    }
    if (lunarMonth > Math.floor(lunar.calendar[m] / 0x10000) + 1) {
      lunarMonth--;
    }
  }
  return {
    lunarYear: lunarYear,
    lunarMonth: lunarMonth,
    lunarDay: lunarDay
  };
};
export const getLunarDateString = (lunarDate) => {
  if (!lunarDate.lunarDay) return;
  let data = {};
  let lunarYear = lunarDate.lunarYear;
  let lunarMonth = lunarDate.lunarMonth;
  let lunarDay = lunarDate.lunarDay;
  data.tg = lunar.tg.charAt((lunarYear - 4) % 10);
  data.dz = lunar.dz.charAt((lunarYear - 4) % 12);
  data.year = lunar.year.charAt((lunarYear - 4) % 12);
  data.month = lunarMonth < 1 ? '(闰)' + lunar.month.charAt(-lunarMonth - 1) : lunar.month.charAt(lunarMonth - 1);
  data.day = (lunarDay < 11) ? '初' : ((lunarDay < 20) ? '十' : ((lunarDay < 30) ? '廿' : '三十'));
  if (lunarDay % 10 !== 0 || lunarDay === 10) {
    data.day += lunar.number.charAt((lunarDay - 1) % 10);
  }
  return data;
};

/**
 *  @description 金额加千分符
  */
export const add_comma_toThousands = (val) => {
  if (val === null) {
    return 0;
  } else if (val.length <= 3) {
    return val;
  } else if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(val)) {
    return val;
  } else {
    let a = RegExp.$1;
    let b = RegExp.$2;
    let c = RegExp.$3;
    let re = new RegExp();
    re.compile('(\\d)(\\d{3})(,|$)');
    while (re.test(b)) {
      b = b.replace(re, '$1,$2$3');
    }
    return a + '' + b + '' + c;
  }
};

/**
 *  金额去掉千分符
 */
export const removeThousands = (num) => {
  if (num === null) {
    return 0;
  } else {
    let number = num.split(',');
    return number.join('');
  }
};

/**
 * 判断当前时间是否在某个时间段内
 */
export const judgeTimeRange = (startTimes, endTimes, currentTimes) => {
  let startHour = parseInt(startTimes.split(':')[0]);
  let startMinute = parseInt(startTimes.split(':')[1]);
  let startSecond = parseInt(startTimes.split(':')[2]);
  let endHour = parseInt(endTimes.split(':')[0]);
  // let endMinute = parseInt(endTimes.split(':')[1]);
  // let endSecond = parseInt(endTimes.split(':')[2]);
  let curHour = parseInt(currentTimes.split(':')[0]);
  let curMinute = parseInt(currentTimes.split(':')[1]);
  let curSecond = parseInt(currentTimes.split(':')[2]);
  if (curHour > startHour && curHour < endHour) { // 大于12点小于20
    return true;
  } else if (curHour === startHour && (curMinute >= startMinute || curSecond >= startSecond)) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断日期是星期几
 * date 为日期参数
 * getDay 从 Date 对象返回一周中的某一天 (0 ~ 6)
 */
export const getMyDay = (dateTime) => {
  let date = new Date(dateTime);
  let week;
  if (date.getDay() === 0) week = '星期日';
  if (date.getDay() === 1) week = '星期一';
  if (date.getDay() === 2) week = '星期二';
  if (date.getDay() === 3) week = '星期三';
  if (date.getDay() === 4) week = '星期四';
  if (date.getDay() === 5) week = '星期五';
  if (date.getDay() === 6) week = '星期六';
  return week;
};
