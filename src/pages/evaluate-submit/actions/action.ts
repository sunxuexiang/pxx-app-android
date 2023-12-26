import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps, IApiResult } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import api from 'api';
import { msg } from 'plume2';
import { config } from '../../../../wmkit/config-online';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments)
      });
    },

    /**
     * 保存
     */
    async save() {
      const {
        main: {
          evaluateAddRequest: {
            goodsEvaluateAddRequest: {
              evaluateScore,
              evaluateContent,
              isAnonymous
            },
            goodsEvaluateImageAddRequest,
            storeEvaluateAddRequestList: {
              goodsScore,
              serverScore,
              logisticsScore
            }
          },
          baseInfo: { storeTobe, storeVO, tid, tradeVO },
          queryType
        }
      } = getData();
      if (queryType == 0) {
        //待评价标签点击进来并且服务没有被评价过
        if (storeTobe == 0) {
          if (!goodsScore && !serverScore && !logisticsScore) {
            if (!evaluateScore) {
              msg.emit('app:tip', '商品评分不可为空！');
              return false;
            } else if (!evaluateContent || evaluateContent.trim() == '') {
              msg.emit('app:tip', '评价晒图文本不可为空！');
              return false;
            }
          } else if (!evaluateScore) {
            msg.emit('app:tip', '商品评分不可为空！');
            return false;
          } else if (!evaluateContent || evaluateContent.trim() == '') {
            msg.emit('app:tip', '评价晒图文本不可为空！');
            return false;
          } else if (!goodsScore) {
            msg.emit('app:tip', '商品质量不可为空！');
            return false;
          } else if (!serverScore) {
            msg.emit('app:tip', '店家服务态度不可为空！');
            return false;
          } else if (!logisticsScore) {
            msg.emit('app:tip', '物流发货速度不可为空！');
            return false;
          }
        } else if (storeTobe != 0) {
          //待评价标签点击进来且服务已评价
          if (!evaluateScore) {
            msg.emit('app:tip', '商品评分不可为空！');
            return false;
          } else if (!evaluateContent || evaluateContent.trim() == '') {
            msg.emit('app:tip', '评价晒图文本不可为空！');
            return false;
          }
        }
      } else if (queryType == 1) {
        //评价服务标签点击进来的时候
        if (!goodsScore) {
          msg.emit('app:tip', '商品质量不可为空！');
          return false;
        } else if (!serverScore) {
          msg.emit('app:tip', '店家服务态度不可为空！');
          return false;
        } else if (!logisticsScore) {
          msg.emit('app:tip', '物流发货速度不可为空！');
          return false;
        }
      }
      const evaluateAddRequest = {
        storeEvaluateAddRequestList: {
          goodsScore,
          serverScore,
          logisticsScore,
          orderNo: tid
        },
        goodsEvaluateAddRequest: {
          evaluateScore,
          evaluateContent,
          isAnonymous,
          goodsInfoId: tradeVO.skuId,
          orderNo: tid
        },
        goodsEvaluateImageAddRequest: goodsEvaluateImageAddRequest
      };
      const {
        code,
        message
      }: IApiResult = await api.goodsEvaluateController.addGoodsEvaluate(
        evaluateAddRequest
      );
      if (code === config.SUCCESS_CODE) {
        dispatch({ type: Command.clean });
        msg.emit('app:tip', '提交成功！');
        //跳转到编辑评价页
        msg.emit('router: back', {
          routeName: 'EvaluateCenter'
        });
      } else {
        msg.emit('app:tip', message);
      }
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('evaluateSubmitMain')
  };
}
