import { Command } from '../constant';
import _ from 'lodash';
import { IMainReducer } from '../types';
import { Action } from 'typings';
import produce from 'immer';
import * as immerUtil from '@/redux/immer-util';

const INITIAL_STATE: IMainReducer = {
  isReady: false,

  // 会员基本信息
  customerInfo: {},

  // 优惠券列表
  couponInfo: {},

  // 热门兑换积分商品列表
  hotExchange: [],

  // 积分商品分类
  cateList: [],

  // 选中的积分商品分类ID
  cateId: null,

  // 选中的积分商品分类索引
  chooseCateIndex: 0,

  canExchange: false,

  sortType: {},

  // 是否查询积分兑换的优惠券列表
  pointsCouponListFlag: false,

  pointsCouponId: '',

  latestPointsCouponInfoList: [],

  // 支付密码弹窗
  pwdModalVisible: false,

  // 支付密码
  payPwd: '',

  // 支付密码是否正确 && 错误冻结后是否已过30分钟
  checkPayPwdRes: true,

  // 支付密码错误次数
  payPwdTime: 0,

  // 优惠券立即兑换弹窗
  visible: false,

  // 优惠券
  pointsCoupon: {},
};

export default function main(
  state = INITIAL_STATE,
  action: Action
): IMainReducer {
  const { type, payload } = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, { ...payload, key: 'main' });

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;

      // 选中积分商品分类事件
      case Command.chooseCate:
        let cateInfo = payload.cate;
        if (cateInfo.cateId !== draftState.cateId) {
          draftState.chooseCateIndex = cateInfo.index;
          draftState.cateId = cateInfo.cateId;
          draftState.pointsCouponListFlag = false;
          draftState.latestPointsCouponInfoList = [];
        }
        return draftState;

      // 积分商品排序事件
      case Command.setSort:
        let newType = payload.newType.type;
        let newSort = '';

        const sortType = draftState.sortType;

        // 是否切换排序类型？
        if (newType !== sortType.type) {
          newSort = 'asc';
        } else {
          // 同一种排序类型，切换升降顺序，我能兑换无顺序
          if (sortType.sort === 'asc') {
            newSort = 'desc';
          } else if (sortType.sort === 'desc') {
            newSort = 'asc';
          }
        }

        draftState.canExchange = false;
        draftState.sortType = { type: newType, sort: newSort };

        return draftState;

      // 优惠券兑换弹窗事件
      case Command.setVisible:
        draftState.visible = payload.visible;
        draftState.pointsCoupon = payload.pointsCoupon;
        draftState.pointsCouponId = payload.pointsCouponId;
        return draftState;

      // 支付密码弹窗事件
      case Command.setPwdModalVisible:
        draftState.pwdModalVisible = payload.pwdModalVisible;
        return draftState;

      // 支付密码事件
      case Command.setPayPwd:
        draftState.payPwd = payload.payPwd;
        return draftState;

      // 密码是否正确
      case Command.setCheckPayPwdRes:
        draftState.checkPayPwdRes = payload.checkPayPwdRes;
        return draftState;

      // 密码错误次数
      case Command.setPayPwdTime:
        draftState.payPwdTime = payload.payPwdTime;
        draftState.checkPayPwdRes = payload.checkPayPwdRes;
        return draftState;

      // 用户信息
      case Command.setCustomerInfo:
        draftState.customerInfo = payload.customerInfo;
        return draftState;

      // 用户信息
      case Command.setCouponInfo:
        draftState.couponInfo = payload.couponInfo;
        return draftState;
    }
  });
}
