import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import api from 'api';
import { VASConst } from '../../../../../wmkit/VAS-Const';
import { config } from 'wmkit/config';
import * as WMkit from 'wmkit/kit';
import * as VAS from 'wmkit/vas';

import * as webapi from './webapi';
import { msg } from 'plume2';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    async changeText(id) {
      dispatch({
        type: Command.changeText,
        payload: id
      });
    },

    /**
     * 点赞
     */
    async giveLike(goodsEvaluateId) {
      if (WMkit.isLoginOrNotOpen()) {
        const { code, message, context } = await webapi.addCustomerGoodsEvaluatePraise({
          goodsEvaluateId: goodsEvaluateId
        });
        if (code == config.SUCCESS_CODE) {
          let { zanGoodsEvaluateList, cancelZanGoodsEvaluateList } = getData().main;
          //获取评价详情
          const goodsEvaluate = await api.goodsEvaluateController.getCustomerGoodsEvaluate(
            {
              evaluateId: goodsEvaluateId
            }
          );
          if (context.customerGoodsEvaluatePraiseVO) {
            msg.emit('app:tip', '点赞成功!');
            if (zanGoodsEvaluateList.findIndex(e => e.evaluateId === goodsEvaluateId) < 0) {
              zanGoodsEvaluateList.push(goodsEvaluate);
            }
            cancelZanGoodsEvaluateList = cancelZanGoodsEvaluateList.filter(
              zanGoodsEvaluate => zanGoodsEvaluate.evaluateId !== goodsEvaluateId
            );
          } else {
            msg.emit('app:tip', '已取消点赞!');
            if (cancelZanGoodsEvaluateList.findIndex(e => e.evaluateId === goodsEvaluateId) < 0) {
              cancelZanGoodsEvaluateList.push(goodsEvaluate);
            }
            zanGoodsEvaluateList = zanGoodsEvaluateList.filter(
              zanGoodsEvaluate => zanGoodsEvaluate.evaluateId !== goodsEvaluateId
            );
          }
          action.commonChange([
            { paths: 'main.zanGoodsEvaluateList', value: zanGoodsEvaluateList },
            { paths: 'main.cancelZanGoodsEvaluateList', value: cancelZanGoodsEvaluateList },
            { paths: 'main.goodsEvaluate', value: goodsEvaluate }
          ]);
        } else {
          msg.emit('app:tip', message);
        }
      } else {
        //显示登录弹框
        msg.emit('loginModal:toggleVisible', {
          callBack: () => {
            msg.emit('router: refresh');
          }
        });
      }
    },

    /**
     * 以当前查询条件查询
     */
    async handleDataReached(data) {
      if (data.code !== config.SUCCESS_CODE) {
        return;
      }
      const { goodsEvaluateVOPage } = data.context;

      let bigImgList = getData().main.bigImgList;
      goodsEvaluateVOPage.content.map((v) => {
        const evaluateImageList = v.evaluateImageList;
        if (evaluateImageList != null) {
          bigImgList.push(...evaluateImageList);
        }
      });

      dispatch({
        type: Command.setBigImgList,
        payload: {
          bigImgList: bigImgList
        }
      });
    },

    /**
     * 切换弹窗显示隐藏
     */
    async changeModal() {
      let { main } = getData();
      dispatch({ type: Command.openCloseModal, payload: !main.visible });
    },


    /**
          * 切换图片
          */
    async changeIndex(index) {
      // dispatch({ type: Command.bigImgIndex, payload: index });
      action.commonChange('main.bigImgIndex', index);
    },

    /**
          * 显示大图
          */
    async showBigImg(evaluate, id) {
      let index = id;
      action.commonChange('main.bigImgList', evaluate);
      action.commonChange('main.bigImgIndex', index);
      // await this.changeIndex(index);

      await this.changeModal();
    },

    /**
     * 判断是否购买了企业购
     */
    async checkIEP() {
      // 存储是否有企业购增值服务
      const flag = await VAS.fetchVASStatus(VASConst.IEP);
      if (flag) {
        const resutl = await VAS.fetchIepInfo();
        const iepCustomerName = resutl.iepInfo.enterpriseCustomerName;
        const iepLogoInfo = resutl.iepInfo.enterpriseCustomerLogo;
        const iepLogoArry = iepLogoInfo ? JSON.parse(iepLogoInfo) : [];
        const iepLogo = iepLogoArry && iepLogoArry.length > 0 ? iepLogoArry[0].url : '';
        const iepPriceName = resutl.iepInfo.enterprisePriceName;
        dispatch({
          type: Command.iepInfo,
          payload: {
            iepLogo: iepLogo,
            iepCustomerName: iepCustomerName,
            iepPriceName: iepPriceName
          }
        });
        dispatch({
          type: Command.checkEnterpriseEnable,
          payload: flag
        });
      }
    }

  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('goodsDetailEvaluationListMain')
  };
}
