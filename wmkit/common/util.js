// import { config } from './config';
import moment from 'moment';
import { Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { msg } from 'plume2';
import DeviceInfo from 'react-native-device-info';
import { cache } from 'wmkit/cache';

/**
 * 格式化时间
 *
 */
Date.prototype.Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};

/**
 *
 * 把长整类型的时间转换成yyyy-MM-dd hh:mm:ss格式的时间
 */
export const formatDate = function (value) {
  let defaultFmt = 'YYYY-MM-DD HH:mm:ss';
  // let date = new Date(value);
  // return date.Format(defaultFmt);
  return moment(value).format(defaultFmt);
};

/**
 * 把日期类型转换成yyyy-MM-dd格式的时间
 */
export const formatDay = function (value) {
  let defaultFmt = 'YYYY-MM-DD';
  return moment(value).format(defaultFmt);
};

/**
 * 把日期类型转换成YYYY年MM月DD日格式的时间
 * @param value
 * @returns {string}
 */
export const formatDayZh = function (value) {
  let defaultFmt = 'YYYY年MM月DD日';
  return moment(value).format(defaultFmt);
};

/**
 * 判断是否在微信中打开
 */
export const isWeixin = function () {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua) {
    return ua.indexOf('micromessenger') > -1;
  } else {
    return false;
  }
};

/**
 * 获取小数点后数字长度
 * @author zhongjiewang
 * @param  {Number} num 数字
 * @return {Number}     长度
 */
function decimalLength(num) {
  let str = num.toString();
  let index = str.indexOf('.');
  return index == -1 ? 0 : str.substr(index + 1).length;
}

/**
 * 小数点后补齐0作为整数
 * @author zhongjiewang
 * @param  {Number} num    数字
 * @param  {Number} length 补齐的长度
 * @return {Number}        整数
 */
function suffixInteger(num, length) {
  let str = num.toString();
  let decimalLen = decimalLength(num);
  str += Math.pow(10, length - decimalLen)
    .toString()
    .substr(1);
  return Number(str.replace('.', ''));
}

/**
 * 浮点数相乘
 * 使用：num1.mul(num2);
 * return 相乘结果
 */
export const mul = function (num1, num2) {
  let r1 = decimalLength(num1);
  let r2 = decimalLength(num2);

  let max = Math.max(r1, r2);

  let n1 = suffixInteger(num1, max);
  let n2 = suffixInteger(num2, max);

  return (n1 * n2) / Math.pow(10, max * 2);
};

/**
 * 浮点数相加
 */
export const add = function (num1, num2) {
  let r1 = decimalLength(num1);
  let r2 = decimalLength(num2);

  let max = Math.max(r1, r2);

  let n1 = suffixInteger(num1, max);
  let n2 = suffixInteger(num2, max);

  return Number(((n1 + n2) / Math.pow(10, max)).toFixed(max));
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 返回值：arg1加上arg2的精确结果
 **/
export const sub = function (num1, num2) {
  let r1 = decimalLength(num1);
  let r2 = decimalLength(num2);

  let max = Math.max(r1, r2);

  let n1 = suffixInteger(num1, max);
  let n2 = suffixInteger(num2, max);

  return Number(((n1 - n2) / Math.pow(10, max)).toFixed(max));
};

/**
 * 除法函数
 * @param num1
 * @param num2
 * @returns {number}
 */
export function div(num1, num2) {
  let r1 = decimalLength(num1);
  let r2 = decimalLength(num2);

  let max = Math.max(r1, r2);

  let n1 = suffixInteger(num1, max);
  let n2 = suffixInteger(num2, max);

  return n1 / n2;
}

/**
 * 判断是否是空对象
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = function (obj) {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
};

/**
 * 为整数添加两位小数
 * 向下截取小数点后两位,如:1.036 -> 1.03
 */
export const addZeroFloor = (num) => {
  let f = parseFloat(num ? num : 0);
  f = div(Math.floor(mul(f, 100)), 100);
  return f.toFixed(2);
};

/**
 * 经纬度 小数处理
 * @param num
 * @returns {string}
 */
export const positionFloor = (num) => {
  let f = parseFloat(num ? num : 0);
  f = div(Math.floor(mul(f, 1000000)), 1000000);
  return f.toFixed(6);
};

/**
 * 为整数添加两位小数
 * 四舍五入
 */
export const addZero = function (num) {
  return new Number(num ? num : 0).toFixed(2);
};

export const parseNumber = function (num) {
  return new Number(num ? num : 0).toFixed(0);
};

/**
 * 规则：6-20，数字、字母和符号
 * 数字：6-10弱，11及后为中    可通过验证，but提示：您的密码过于简单，有被盗风险，建议您修改
 * 字母：6-10弱，11及后为中    可通过验证，but提示：您的密码过于简单，有被盗风险，建议您修改
 * 字符：6-10弱，11及后为中    可通过验证，but提示：您的密码过于简单，有被盗风险，建议您修改
 * 数字、字母或字符两者组合：6- 10中 ，11及后为强
 * 数字、字母和字符三者组合：6及后为强
 * @param pwdValue
 * @returns {*} [1,2,3]
 */
export const getLevel = (pwdValue) => {
  let pattern_1 = /^.*([\W_])+.*$/i;
  let pattern_2 = /^.*([a-zA-Z])+.*$/i;
  let pattern_3 = /^.*([0-9])+.*$/i;
  let level = 0;
  if (pwdValue.length > 10) {
    level++;
  }
  if (pattern_1.test(pwdValue)) {
    level++;
  }
  if (pattern_2.test(pwdValue)) {
    level++;
  }
  if (pattern_3.test(pwdValue)) {
    level++;
  }
  if (level > 3) {
    level = 3;
  }
  return level;
};

// export const clearImgDomain = (src  ) => {
//   return src.replace(config.IMAGE_SERVER, '');
// }
//
// export const getSizedImagePath = (src  ) => {
//   if (!src)
//     return '';
//   return `${config.IMAGE_SERVER}${src}`
// }

/**
 * 格式化金额
 * @param s 金额数
 * @param n 显示小位数
 * @param fp 标准金额展示
 * @returns {string}
 */
export const fmoney = (s, n = 2, fp = undefined) => {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + '';
  let l = s
    .split('.')[0]
    .split('')
    .reverse(),
    r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i++) {
    if (fp) {
      t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
    } else {
      t += l[i];
    }
  }

  return (
    t
      .split('')
      .reverse()
      .join('') +
    '.' +
    r
  );
};
/**
 * 不四舍五入的取两位小数
 */
export const toFixed2 = (number) => {
  if (typeof number != 'string') {
    number = number.toString();
  }
  let numberArray = number.split('.');
  if (numberArray[1]) {
    if (numberArray[1].length == 1) {
      numberArray[1] = numberArray[1] + '0';
    } else if (numberArray[1].length > 2) {
      numberArray[1] = numberArray[1].substring(0, 2);
    }
  } else {
    numberArray[1] = '00';
  }
  return parseFloat(numberArray.join('.')).toFixed(2);
};

/**
 * 异步加载js
 */
export const loaderJs = (jsSrc) => {
  return new Promise((resolve, reject) => {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = jsSrc;
    head.appendChild(script);

    script.onload = function () {
      resolve();
    };

    script.onerror = function (err) {
      reject(err);
    };
  });
};

export const safeMobile = (mobile) => {
  if (!mobile) {
    return mobile;
  }

  let mobileStr = mobile.toString();
  if (mobileStr.length > 7) {
    return `${mobileStr.slice(0, 3)}****${mobileStr.slice(7)}`;
  }
  return mobile.toString();
};

export const isIphoneX = () => {
  let dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
};

export const ifIphoneX = (iphoneXStyle, regularStyle) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  } else {
    return regularStyle;
  }
};
export const isIphoneXR = () => {
  return (
    DeviceInfo.getUniqueId() == 'iPhone11,8'
  );
};

export const ifIphoneXR = (iphoneXStyle, regularStyle) => {
  if (isIphoneXR()) {
    return iphoneXStyle;
  } else {
    return regularStyle;
  }
};

/**
 * 展示注册赠券信息
 * @param couponResponse
 * @param isShowButton
 */
export const showRegisterModel = (couponResponse, isShowButton) => {
  if (couponResponse && couponResponse.couponList.length > 0) {
    let coupon = {
      // 是否显示弹框
      visible: true,
      //优惠券列表
      couponList: couponResponse.couponList,
      //活动标题
      title: couponResponse.title,
      //活动描述
      desc: couponResponse.desc,
      // true  为注册赠券  false 进店赠券
      isStoreModel: true
    };
    if (isShowButton != undefined) {
      // 是否展示我的优惠券按钮
      coupon['isShowButton'] = isShowButton;
      coupon['isStoreModel'] = false;
    }
    msg.emit('registerCouponVisible', coupon);
  }
};

/**
 * 落地页跳转
 */
const PUSHTYPE = {
  GOODS: 0,
  GOODSINFO: 1,
  GOODSGROUP: 2,
  CATE: 3,
  STORE: 4,
  MARKETING: 5,
  PAGE: 6,
  ACCOUNT: 7,
  PROPERTY: 8,
  ORDER: 9,
  RETUN_ORDER: 10,
  DISTRIBUTE: 11,
  USERPAGE: 12
};
export const pageReplace = (data) => {
  if (!data) {
    return;
  }
  switch (data.type) {
    case PUSHTYPE.GOODS:
      msg.emit('router: goToNext', {
        routeName: 'GoodsDetail',
        skuId: data.skuId
      });
      break;
    case PUSHTYPE.GOODSINFO:
      break;
    case PUSHTYPE.GOODSGROUP:
      break;
    case PUSHTYPE.CATE:
      msg.emit('router: goToNext', {
        routeName: 'GoodsList',
        cateId: data.cataId,
        cateName: data.name,
        showGoBack: true
      });
      break;
    case PUSHTYPE.STORE:
      msg.emit('router: goToNext', {
        routeName: 'StoreMain',
        storeId: data.storeId
      });
      break;
    case PUSHTYPE.MARKETING:
      if (data.node == 0) {
        msg.emit('router: goToNext', {
          routeName: 'SpellGroupDetail',
          skuId: data.skuId
        });
      } else if (data.node == 1) {
        msg.emit('router: goToNext', {
          routeName: 'GoodsDetail',
          skuId: data.skuId
        });
      } else if (data.node == 2) {
        msg.emit('router: goToNext', {
          routeName: 'GoodsListPromotion',
          mid: data.mid
        });
      }
      break;
    case PUSHTYPE.USERPAGE:
      msg.emit('router: goToNext', {
        routeName: data.router
      });
      break;
    case PUSHTYPE.PAGE:
      //这行是为了跳转魔方配置页，清除店铺id
      AsyncStorage.removeItem(cache.STORE_ID);

      msg.emit('router: goToNext', {
        routeName: 'PageLink',
        pageType: data.pageType,
        pageCode: data.pageCode
      });
      break;
    // case PUSHTYPE.ACCOUNT:
    //   msg.emit('router: goToNext', {
    //     routeName: data.page
    //   });
    //   break;
    case PUSHTYPE.PROPERTY:
      if (data.node == 0 || data.node == 1) {
        msg.emit('router: goToNext', {
          routeName: 'MyCoupon'
        });
      } else if (data.node == 2 || data.node == 3 || data.node == 4) {
        msg.emit('router: goToNext', {
          routeName: 'PointsList'
        });
      } else if (data.node == 5) {
        msg.emit('router: goToNext', {
          routeName: 'GrowthValue'
        });
      } else if (data.node == 6) {
        msg.emit('router: goToNext', {
          routeName: 'CashAccountDetail'
        });
      } else if (data.node == 7 || data.node == 8 || data.node == 9) {
        msg.emit('router: goToNext', {
          routeName: 'BalanceCashRecord'
        });
      }
      break;
    case PUSHTYPE.ORDER:
      if (
        data.node == 0 ||
        data.node == 1 ||
        data.node == 2 ||
        data.node == 3 ||
        data.node == 4 ||
        data.node == 5
      ) {
        msg.emit('router: goToNext', {
          routeName: 'OrderDetail',
          oId: data.id
        });
      } else if (data.node == 6) {
        msg.emit('router: goToNext', {
          routeName: 'EvaluateCenter'
        });
      } else if (data.node == 7) {
        msg.emit('router: goToNext', {
          routeName: 'EvaluateSubmit',
          queryType: 0, //评价类型
          goodInfo: {
            skuId: data.skuId,
            storeId: data.storeId,
            tid: data.tid
          }
        });
      } else if (data.node == 8) {
        msg.emit('router: goToNext', {
          routeName: 'EvaluateSubmit',
          queryType: 1, //评价类型
          goodInfo: {
            skuId: data.skuId,
            storeId: data.storeId,
            tid: data.tid
          }
        });
      } else if (
        data.node == 9 ||
        data.node == 10 ||
        data.node == 11 ||
        data.node == 12
      ) {
        msg.emit('router: goToNext', {
          routeName: 'GroupBuyDetail',
          grouponNo: data.id
        });
      }
      break;
    case PUSHTYPE.RETUN_ORDER:
      if (
        data.node == 0 ||
        data.node == 1 ||
        data.node == 2 ||
        data.node == 3 ||
        data.node == 4 ||
        data.node == 5
      ) {
        msg.emit('router: goToNext', {
          routeName: 'ReturnDetail',
          rid: data.id
        });
      }
      break;
    case PUSHTYPE.DISTRIBUTE:
      if (data.node == 0) {
        msg.emit('router: goToNext', {
          routeName: 'CustomerOrderDetail',
          oId: data.id
        });
      } else if (data.node == 40) {
        msg.emit('router: goToNext', {
          routeName: 'GoodsDetail',
          skuId: data.id
        })
      } else {
        msg.emit('router: goToNext', {
          routeName: 'MyCustomer'
        });
      }
      break;
  }
};
