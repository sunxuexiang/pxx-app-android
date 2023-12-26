import { Alert, AlertAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Relax, msg } from 'plume2';
import { cache } from './cache';
import api from 'api';
const fetchModal = async (applicationPageName) => {
  const res = await api.PopupAdministrationQueryController.pageManagementAndPopupAdministrationList(
    {
      applicationPageName: applicationPageName
    }
  );
  return res.popupAdministrationVOS;
};

const link = (param) => {
  let { info, linkKey } = param;
  // eslint-disable-next-line no-unreachable
  switch (linkKey) {
    case 'goodsList':
      msg.emit('router: goToNext', {
        routeName: 'GoodsDetail',
        skuId: info.skuId
      });
      break;
    case 'storeList':
      msg.emit('router: goToNext', {
        routeName: 'StoreMain',
        storeId: info.storeId
      });
      break;
    case 'categoryList':
      msg.emit('router: goToNext', {
        routeName: 'GoodsList',
        cateId: info.cataId,
        cateName: info.name,
        showGoBack: true
      });
      break;
    case 'promotionList':
      switch (info.cateKey) {
        case 'preOrder':
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: info.goodsInfoId
          });
          break;
        case 'preSell':
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: info.goodsInfoId
          });
          break;
        case 'groupon':
          msg.emit('router: goToNext', {
            routeName: 'SpellGroupDetail',
            skuId: info.goodsInfoId
          });
          break;
        case 'flash':
          msg.emit('router: goToNext', {
            routeName: 'GoodsDetail',
            skuId: info.goodsInfoId
          });
          break;
        case 'full':
          msg.emit('router: goToNext', {
            routeName: 'GoodsListPromotion',
            mid: info.marketingId
          });
          break;
        case 'comBuy':
          msg.emit('router: goToNext', {
            routeName: 'CombinationGoods',
            skuId: info.goodsInfoId
          });
          break;
        case 'onePrice':
          msg.emit('router: goToNext', {
            routeName: 'GoodsListPromotion',
            mid: info.marketingId
          });
          break;
        case 'halfPrice':
          msg.emit('router: goToNext', {
            routeName: 'GoodsListPromotion',
            mid: info.marketingId
          });
          break;
      }
      break;
    case 'pageList':
      msg.emit('router: goToNext', {
        routeName: 'PageLink',
        pageType: info.pageType,
        pageCode: info.pageCode
      });
      break;
    case 'operationClassifyList':
      msg.emit('router: goToNext', {
        routeName: 'CateOnelevelList',
        cateId: info.cateId,
      });
      break;
    case 'userpageList':
      switch (info.key) {
        case 'myHome':
          msg.emit('router: goToNext', {
            routeName: 'Main'
          });
          break;
        case 'category':
          msg.emit('router: goToNext', {
            routeName: 'AllList'
          });
          break;
        case 'allProduct':
          msg.emit('router: goToNext', {
            routeName: 'GoodsList',
            showGoBack: true
          });
          break;
        case 'cart':
          msg.emit('router: goToNext', {
            routeName: 'PurchaseOrderWithoutBottom'
          });
          break;
        case 'order':
          msg.emit('router: goToNext', {
            routeName: 'OrderList'
          });
          break;
        case 'myReturnOrder':
          msg.emit('router: goToNext', {
            routeName: 'RefundList'
          });
          break;
        case 'UserCenter':
          msg.emit('router: goToNext', {
            routeName: 'UserCenter'
          });
          break;
        case 'follow':
          msg.emit('router: goToNext', {
            routeName: 'UserStore'
          });
          break;
        case 'likeStore':
          msg.emit('router: goToNext', {
            routeName: 'StoreAttention'
          });
          break;
        case 'couponCenter':
          msg.emit('router: goToNext', {
            routeName: 'CouponCenter'
          });
          break;
        case 'grouponCenter':
          msg.emit('router: goToNext', {
            routeName: 'GrouponCenter'
          });
          break;
        case 'xSiteGouWuDai':
          msg.emit('router: goToNext', {
            routeName: 'FlashSale'
          });
          break;
        case 'integral-mall':
          msg.emit('router: goToNext', {
            routeName: 'PointsMall'
          });
          break;
        case 'member-center':
          msg.emit('router: goToNext', {
            routeName: 'MemberCenter'
          });
          break;
      }
      break;
  }
};

const setModalShow = async (res, params, id) => {
  if (res.length > 0) {
    let index = res.map((item) => item.popupId).indexOf(id);
    let currentModal = res.filter((item) => item.popupId == id);
    let launchFrequency = currentModal[0].launchFrequency;
    let applicationPageName = params;
    let popupStatus = currentModal[0].popupStatus;
    let popupId = currentModal[0].popupId;
    let imgUrl = currentModal[0].popupUrl;
    let jumpPage = currentModal[0].jumpPage;
    // 是否全屏
    let isFull = currentModal[0].sizeType === 1;
    let nextPopupId = '';
    if (index + 1 < res.length) {
      nextPopupId = res[index + 1].popupId;
    }
    if (popupStatus == 1) {
      if (launchFrequency.split(',').length == 1) {
        let pooIds = await AsyncStorage.getItem(
          JSON.stringify(`${applicationPageName}${popupId}`)
        );
        if (!pooIds) {
          AsyncStorage.setItem(
            JSON.stringify(`${applicationPageName}${popupId}`),
            JSON.stringify(true),
            (error) => {
              if (__DEV__) {
                if (error) {
                  console.log('失败');
                } else {
                  console.log('成功');
                }
              }
            }
          );
          return { imgUrl, jumpPage, nextPopupId, showFlag: true, isFull };
        } else {
          return { imgUrl, jumpPage, nextPopupId, showFlag: false, isFull };
        }
      } else {
        let day = launchFrequency.split(',')[1];
        let hasPopId = await AsyncStorage.getItem(
          JSON.stringify(`${applicationPageName}${popupId}`)
        );
        const show = await showMulitTimes(
          day,
          `${applicationPageName}${popupId}`
        );
        if (!hasPopId || hasPopId == '' || hasPopId != 'true') {
          if (show) {
            AsyncStorage.setItem(
              JSON.stringify(`${applicationPageName}${popupId}`),
              JSON.stringify(true),
              (error) => {
                if(__DEV__) {
                  if (error) {
                    console.log('失败');
                  } else {
                    console.log('成功');
                  }
                }
              }
            );
            return { imgUrl, jumpPage, nextPopupId, showFlag: true, isFull };
          }
        } else {
          if (!show) {
            return { imgUrl, jumpPage, nextPopupId, showFlag: false, isFull };
          }
        }
      }
    } else {
      return { imgUrl, jumpPage, nextPopupId, showFlag: false, isFull };
    }
  } else {
    return {};
  }
};
//N天执行一次
async function showMulitTimes(day, popupId) {
  let res = await AsyncStorage.getItem(JSON.stringify(`time${popupId}`))
  const e = diff(res, day);
  if (!res || res == '' || e == false) {
    AsyncStorage.setItem(
      JSON.stringify(`time${popupId}`),
      JSON.stringify(Date.now())
    );
    return true;
  } else {
    return false;
  }
}
function diff(t, day) {
  return Date.now() - t < 24 * 3600 * 1000 * day ? true : false;
}

export { link, setModalShow, fetchModal };
