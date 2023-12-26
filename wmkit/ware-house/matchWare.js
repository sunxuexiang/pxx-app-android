import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as api from './webapi';
import { cache,config } from 'wmkit';

/**
 * 匹配分仓信息并返回匹配好的分仓
 */
export const matchWareStore = async (cityCode) => {
  const token = window.token;
  if(token){
    const { code, context } =  await api.matchWareHouse(cityCode);
    if (code === config.SUCCESS_CODE) {
      const chooseWareInfo = context.wareHouseVO;
      if (chooseWareInfo) {
        await AsyncStorage.setItem(cache.MATCH_WARE_STORE, JSON.stringify(chooseWareInfo));
        await AsyncStorage.setItem(cache.MATCHING_WAREHOUSE_FLAG, JSON.stringify({matchFlag: true}));
      }
      return chooseWareInfo;
    } else {
      await AsyncStorage.setItem(cache.MATCHING_WAREHOUSE_FLAG,  JSON.stringify({matchFlag: false}));
    }
  }else{
    if(!cityCode){
      return ;
    }
    const { code, context } =  await api.matchWareHouseWithoutLogin(cityCode);
    if (code === config.SUCCESS_CODE) {
      const chooseWareInfo = context.wareHouseVO;
      if (chooseWareInfo) {
        await AsyncStorage.setItem(cache.MATCH_WARE_STORE, JSON.stringify(chooseWareInfo));
        await AsyncStorage.setItem(cache.MATCHING_WAREHOUSE_FLAG, JSON.stringify({matchFlag: true}));
      }
      return chooseWareInfo;
    } else {
      await AsyncStorage.setItem(cache.MATCHING_WAREHOUSE_FLAG,  JSON.stringify({matchFlag: false}));
    }
  }
};

/**
 * 查询所有自提点
 */
export async function queryPickUpStores() {
  const { res } = await api.queryPickUpStores();
  if (res.code === config.SUCCESS_CODE) {
    return res.context.wareHouseVOList;
  } else {
    Alert.alert('提示', '自提点获取失败！！');
  }
}

/**
 * 获取匹配分仓的Id
 */
export async function getMatchedWareId() {
  const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
  if (wareStr) {
    const ware = JSON.parse(wareStr);
    if (ware && ware.wareId) {
      return ware.wareId;
    } else {
      console.log('-------------------- 未获取到分仓的Id ----------------');
      return null;
    }
  }
  return null;
}

/**
 * 获取是否匹配
 * @returns {Promise<void>}
 */
export async function getMatchFlag() {
  const matchedInfo = await AsyncStorage.getItem(cache.MATCHING_WAREHOUSE_FLAG);
  if(matchedInfo ){
    const matchFlag = JSON.parse(matchedInfo).matchFlag;
    if(matchFlag){
      return true;
    }
  }
 return false;
}

/**
 * 获取选中的城市Code
 */
export async function queryChooseCity() {
  const cityCode = await AsyncStorage.getItem(cache.CHOOSE_POSITION_CITY_CODE);
  return cityCode;
}

/**
 * 设置选中的地区，缓存仓库信息和城市的code
 * @param cityCode
 */
export async function setChooseCity(cityCode) {
  await AsyncStorage.setItem(cache.CHOOSE_POSITION_CITY_CODE, JSON.stringify(cityCode));
  return await matchWareStore(cityCode);
}

/**
 * 临时设置默认的主仓信息
 */
export async function getMatchedAddress() {
  const wareStr = await AsyncStorage.getItem(cache.MATCH_WARE_STORE);
  const wareHouse = JSON.parse(wareStr);
  if (wareHouse) {
    return wareHouse.wareId;
  } else {
    const { code, context } = await api.getMatchedAddress();
    if (code === config.SUCCESS_CODE) {
      const wareHouseInfo = context.wareHouseVO;
      if (wareHouseInfo) {
        await AsyncStorage.setItem(cache.MATCH_WARE_STORE, JSON.stringify(wareHouseInfo));
      }
    } else {
      Alert.alert('提示', '匹配主仓信息失败');
    }
  }
}

/**
 * 查询上次登录最后选泽的地址
 */
export async function getBeforeAddress() {
  let { code, context } = await api.doInitAddressList();
  if (code == config.SUCCESS_CODE) {
    if (context.length != 0) {
      let list = context.filter((v) => (v.chooseFlag));
      if (list.length == 0) {
        list = context.filter((v) => (v.isDefaltAddress && v.isDefaltAddress == 1));
        if (list.length != 0) {
          context = list;
        }
      } else {
        context = list;
      }
    }
  } else {
    context = [];
  }
  return context;
}

/**
 *更新最后一次收货地址
 */
export async function updateLastAddress(customerId, deliveryAddressId) {
  const request = {
    deliveryAddressId: deliveryAddressId,
    customerId: customerId
  };
  await api.updateLastAddress(request);
}
