import React from 'react';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import * as WMkit from 'wmkit/kit';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';

import EvaluateItem from './evaluate-item';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(
  store2Props,
  actions
)
export default class Info extends React.Component<
  Partial<IInfoProps>,
  T.IInfoState
> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return main.goodsId ? (
      <WmListView
        key="wmListView"
        url={
          WMkit.isLoginOrNotOpen()
            ? '/goodsDetailEvaluate/evaluatePageLogin'
            : '/goodsDetailEvaluate/evaluatePage'
        }
        params={{ goodsId: main.goodsId, isShow: 1 }}
        renderRow={(item) => (
          <EvaluateItem
            item={item}
            visible={main.visibleMap[item.evaluateId]}
            onSpread={() => action.changeText(item.evaluateId)}
          />
        )}
        dataPropsName={'context.goodsEvaluateVOPage.content'}
        renderEmpty={() => (
          <WMEmpty
            emptyImg={{
              uri: 'http://pic.qianmi.com/astore/d2c-wx/images/list-none.png'
            }}
            desc="该商品暂无评论"
          />
        )}
        onDataReached={action.handleDataReached}
      />
    ) : null;
  }
}
