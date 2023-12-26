/**
 * Created by feitingting on 2017/7/13.
 */
import Fetch from 'wmkit/fetch';

/**
 * 注册账号
 * @param mobile
 * @param code
 * @param password
 * @returns {Promise<Result<T>>}
 */
export const register = (mobile, password,code,inviteCode) => {
    return Fetch('/register', {
        method: 'POST',
        body: JSON.stringify({
            customerAccount: mobile,
            customerPassword: password,
            verifyCode: code,
            inviteCode:inviteCode
        })
    });
};

/**
 * 弹框注册，不携带图形验证码
 * @param account
 * @param telCode
 * @param password
 */
export const registerModal = (account,password,telCode,inviteCode) => {
    return Fetch('/register/modal', {
        method: 'POST',
        body: JSON.stringify({
            customerAccount: account,
            customerPassword: password,
            verifyCode: telCode,
            inviteCode:inviteCode
        })
    });
};

/**
 * 获取注册限制
 */
export const getRegisterLimitType = () =>
  Fetch(`/getRegisterLimitType`, { method: 'POST' });
