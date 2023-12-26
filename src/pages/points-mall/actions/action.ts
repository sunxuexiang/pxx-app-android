import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import { Confirm } from 'wmkit/modal/confirm';
import { config } from 'wmkit/config';

import * as webApi from './webapi';
import { msg } from 'plume2';
// import moment from 'moment';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    /**
     * 选中除积分商品分类外的选项
     */
    onChooseOtherCate(isCoupon: boolean) {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            cateId: null,
            chooseCateIndex: 0,
            pointsCouponListFlag: isCoupon,
            latestPointsCouponInfoList: []
          }
        }
      });
    },

    /**
     * 选中积分商品分类事件
     * @param {string} cateId 选中的分类ID
     * @param {number} index 选中的分类ID索引
     */
    choosePointsCate(cateId: number, index: number) {
      dispatch({
        type: Command.chooseCate,
        payload: {
          cate: {
            cateId: cateId,
            index: index
          }
        }
      });
    },

    /**
     * 选中我能兑换
     */
    onChooseCanExchange() {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            canExchange: true,
            sortType: { type: '', sort: '' }
          }
        }
      });
    },

    /**
     * 设置排序
     */
    setSort(type: string) {
      dispatch({
        type: Command.setSort,
        payload: {
          newType: {
            type: type
          }
        }
      });
    },

    /**
     * 设置优惠券兑换弹窗
     */
    setVisible(type: boolean, pointsCoupon: {}, pointsCouponId: number) {
      dispatch({
        type: Command.setVisible,
        payload: {
          visible: type,
          pointsCoupon: pointsCoupon,
          pointsCouponId: pointsCouponId
        }
      });
    },

    /**
     * 设置密码输入弹窗
     * @param type
     */
    setPwdModalVisible(type: boolean) {
      dispatch({
        type: Command.setPwdModalVisible,
        payload: {
          pwdModalVisible: type
        }
      });
    },

    /**
     * 设置密码
     * @param type
     */
    setPayPwd(type: string) {
      dispatch({
        type: Command.setPayPwd,
        payload: {
          payPwd: type
        }
      });
    },

    /**
     * 设置是否密码正确
     * @param type
     */
    setCheckPayPwdRes(type: boolean) {
      dispatch({
        type: Command.setCheckPayPwdRes,
        payload: {
          checkPayPwdRes: type
        }
      });
    },

    /**
     * 密码错误次数
     * @param type
     */
    setPayPwdTime(type: number, checkPayPwdRes: boolean) {
      dispatch({
        type: Command.setPayPwdTime,
        payload: {
          payPwdTime: type,
          checkPayPwdRes: checkPayPwdRes
        }
      });
    },

    /**
     * 用户信息
     * @param type
     */
    setCustomerInfo(type: {}) {
      dispatch({
        type: Command.setCustomerInfo,
        payload: {
          customerInfo: type
        }
      });
    },

    /**
     * 优惠券列表
     * @param type
     */
    setLatestPointsCouponInfoList(latestPointsCouponInfoList) {
      dispatch({
        type: Command.init,
        payload: {
          main: { latestPointsCouponInfoList: latestPointsCouponInfoList }
        }
      });
    },

    /**
     * 立即兑换
     */
    async exchangeCoupon(
      payPassword,
      pointsCouponId,
      latestPointsCouponInfoList
    ) {
      //校验输入密码
      if (payPassword == '') {
        msg.emit('app:tip', '请输入支付密码');
        return;
      }
      let checkPayPwd = await this._checkCustomerPayPwd(payPassword);
      if (!checkPayPwd) {
        await this.getLoginCustomerInfo();
        // this.setCheckPayPwdRes(false);
        return;
      } else {
        this.setCheckPayPwdRes(true);
      }
      if (pointsCouponId == '') {
        msg.emit('app:tip', '积分优惠券不存在，请重新兑换');
        return;
      }
      await webApi.doFetchCoupon(pointsCouponId).then(async (res) => {
        if (res && res.code == config.SUCCESS_CODE) {
          msg.emit('app:tip', '兑换成功');
          // 1.局部刷新已兑换优惠券的最新数据
          await this.getCoupon(pointsCouponId, latestPointsCouponInfoList);
          // 2.更新会员积分信息
          this.initCustomerInfo();
          // 3.重置支付密码
          this.setPayPwd('');
          // 4.关闭支付密码弹窗
          this.setPwdModalVisible(false);
        } else {
          await this.getCoupon(pointsCouponId, latestPointsCouponInfoList);
          msg.emit('app:tip', res.message);
          this.setPwdModalVisible(false);
        }
      });
    },

    // 跟新优惠券数据
    async getCoupon(pointsCouponId, latestPointsCouponInfoList) {
      const couponRes: any = await webApi.getCouponById(pointsCouponId);
      if (couponRes.code == config.SUCCESS_CODE) {
        const couponInfo = couponRes.context.pointsCouponVO;

        const couponInfoVo = {
          pointsCouponId: couponInfo.pointsCouponId,
          exchangeCount: couponInfo.exchangeCount,
          sellOutFlag: couponInfo.sellOutFlag
        };

        const index = latestPointsCouponInfoList.findIndex(
          (info) => info.pointsCouponId == couponInfoVo.pointsCouponId
        );
        if (index > -1) {
          latestPointsCouponInfoList[index] = couponInfoVo;
        } else {
          latestPointsCouponInfoList.push(couponInfoVo);
        }

        this.setLatestPointsCouponInfoList(latestPointsCouponInfoList);
      } else {
        msg.emit('app:tip', couponRes.message);
      }
    },

    /**
     * 校验会员支付密码是否可用
     * @param payPassword
     */
    async isPayPwdValid(pointCoupon) {
      const res = await webApi.isPayPwdValid();
      if (res.code == 'K-000000') {
        this.setVisible(true, pointCoupon, pointCoupon.pointsCouponId);
      } else if (res.code == 'K-010206') {
        // @ts-ignore
        Confirm({
          text: '您还没有设置支付密码，暂时无法使用积分支付',
          okText: '设置支付密码',
          okFn: () => msg.emit('router: goToNext', { routeName: 'PayPassword' })
        });
      } else if (res.code == 'K-010207') {
        msg.emit('app:tip', res.message);
      }
    },

    /**
     * 校验输入支付密码
     * @param payPassword
     */
    async _checkCustomerPayPwd(payPassword) {
      const res = await webApi.checkCustomerPayPwd(payPassword);
      if (res.code == 'K-000000') {
        return true;
      } else if (res.code == 'K-010206') {
        // @ts-ignore
        Confirm({
          text: '您还没有设置支付密码，暂时无法使用积分支付',
          okText: '设置支付密码',
          okFn: () => msg.emit('router: goToNext', { routeName: 'PayPassword' })
        });
      } else {
        msg.emit('app:tip', res.message);
        return false;
      }
    },

    async getLoginCustomerInfo() {
      webApi.getLoginCustomerInfo().then((res) => {
        if (res.code === config.SUCCESS_CODE) {
          // 查询支付密码相关信息
          let errorTime = 0;
          if (res.context.payErrorTime) {
            errorTime = res.context.payErrorTime;
          }
          // 重新设置state的value
          this.setPayPwdTime(errorTime, false);
        } else {
          msg.emit('app:tip', '初始化失败！请重试');
        }
      });
    },

    /**
     * 初始化用户信息
     */
    async initCustomerInfo() {
      const res: any = await webApi.getCustomerInfo();
      if (res && res.code == config.SUCCESS_CODE) {
        this.setCustomerInfo(res.context);
      }
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pointsMallMain')
  };
}
