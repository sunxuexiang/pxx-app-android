
import { nanoid } from 'nanoid/non-secure';
import { msg } from 'plume2';
import { Fetch } from 'wmkit';

/**
 * Gets the current screen from navigation state
 * @param state
 */
const getActiveRoute = state => {
  const route = state.routes[state.index] || state.routes[state.routes.length - 1] || {};

  if (route.state) {
    // Dive into nested navigators
    return getActiveRoute(route.state)
  }

  return route
}

/**
 * 生成route key
 * @param name route名
 */
const generateKey = (name) => {
  return `${name}-${nanoid()}`
}

/**
 * 查询是否需要登录
 */
const fetchNeedLogin = () => {
  // 已登录状态下, 无需查询是否开发访问, 无意义
  // 因此在已登录状态下, 直接返回
  if(window.token) return
  Fetch('/userSetting/isVisitWithLogin', {
    method: 'POST'
  }).then((res) => {
    if (res.code == 'K-000000') {
      window.needLogin = res.context.audit;
    } else {
      msg.emit('app:tip', '您的网络不给力！');
    }
  });
}

export {
  getActiveRoute,
  generateKey,
  fetchNeedLogin
} 
