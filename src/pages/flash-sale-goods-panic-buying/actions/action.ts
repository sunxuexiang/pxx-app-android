import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import * as WMkit from 'wmkit/kit';
import { config } from 'wmkit/config';

import { msg } from 'plume2';
import * as webapi from './webapi';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    /**
     * 获取抢购商品详情
     * @param flashSaleGoodsId
     * @private
     */
    async getGoodsInfoDetail(flashSaleGoodsId) {
      let param = { flashSaleGoodsId: flashSaleGoodsId };
      let goodsInfo = {
        goodImage: '',
        goodName: '',
        goodIntro: '',
        goodPrice: ''
      };
      let flashSaleInfoRes: any = await api.flashSaleController.getFlashSaleInfo(
        param
      );
      if (flashSaleInfoRes) {
        goodsInfo.goodPrice = flashSaleInfoRes.price;
        goodsInfo.goodImage = flashSaleInfoRes.goods.goodsImg || flashSaleInfoRes.goodsInfo.goodsInfoImg;
        goodsInfo.goodName = flashSaleInfoRes.goodsInfo.goodsInfoName;
        goodsInfo.goodIntro = flashSaleInfoRes.specText;
      }
      dispatch({ type: Command.goodsInfo, payload: goodsInfo });
    },

    /**
     * 是否获取抢购资格定时任务查询
     * @param flashSaleGoodsId
     * @param flashSaleGoodsNum
     */
    async getFlashSaleGoodsQualifications(flashSaleGoodsId, flashSaleGoodsNum) {
      this.timer = setInterval(async () => {
        if (WMkit.isLoginOrNotOpen()) {
          let res = await webapi.getFlashSaleGoodsQualifications({
            flashSaleGoodsId: flashSaleGoodsId,
            flashSaleGoodsNum: flashSaleGoodsNum
          });
          if (res.code == config.SUCCESS_CODE) {
            if (res.context.flashSaleGoodsId != null) {
              //暂停定时任务
              clearInterval(this.timer);
              msg.emit('router: goToNext', {
                routeName: 'FlashSaleOrderConfirm'
              });
              window.y = '';
            }
          } else {
            clearInterval(this.timer);
            msg.emit('app:tip', res.message);
            setTimeout(() => {
              msg.emit('router: goToNext', {
                routeName: 'FlashSale'
              });
            }, 1000);
          }
        } else {
          //暂停定时任务
          clearInterval(this.timer);
        }
      }, 5000);
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('flashSaleGoodsPanicBuyingMain')
  };
}
