import AsyncStorage from '@react-native-community/async-storage';
import { VASConst } from './VAS-Const';
import Fetch from 'wmkit/fetch';
import { cache } from 'wmkit/cache';
import { config } from 'wmkit/config';

import { fromJS } from 'immutable';
/**
 * iep增值服务鉴权
 */
export const checkIepAuth = async () => {
  return await fetchVASStatus(VASConst.IEP);
};

/**
 * 查询iep配置信息
 * 例:
 * {
 *    import { VAS } from 'wmkit';
 *    import { VASConst } from 'config';
 *    const res = await VAS.fetchIepInfo();
 * }
 */
export async function fetchIepInfo() {
  const isIepAuth = await checkIepAuth();
  let result = { isIepAuth: isIepAuth, iepInfo: {} };
  if (isIepAuth) {
    const res = (await Fetch('/vas/iep/setting/cache'));
    if (res.code === config.SUCCESS_CODE) {
      const info = res.context.iepSettingVO;
      result.iepInfo = info;
    }
  }
  return result;
}


/**
 * 查询所有增值服务
 */
export async function fetchAllVAS() {
  let data = await AsyncStorage.getItem(cache.VALUE_ADDED_SERVICES);
  if (data) {
    const services = JSON.parse(data);
    return services;
  } else {
    const res = await Fetch('/vas/setting/list');
    if (res.code === config.SUCCESS_CODE) {
      const services = res.context.services;
      AsyncStorage.setItem(
        cache.VALUE_ADDED_SERVICES,
        JSON.stringify(services)
      );
      return services;
    } else {
      return null;
    }
  }
}

/**
 * 查询指定服务的状态
 * 例:
 * {
 *    import { VAS, VASConst } from 'wmkit';
 *    const res = await VAS.fetchVASStatus(VASConst.IEP);
 * }
 */
export async function fetchVASStatus(serviceName) {
  // let services = await fetchAllVAS();
  // if (services) {
  //   const service = fromJS(services).find(
  //     (f) => f.get('serviceName') === serviceName
  //   );
  //   if (service) {
  //     return service.get('serviceStatus');
  //   } else {
  //     return false;
  //   }
  // } else {
  //   return false;
  // }
  return false;
}
