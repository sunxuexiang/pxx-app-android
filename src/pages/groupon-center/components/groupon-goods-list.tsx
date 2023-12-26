import React from 'react';

import * as T from '../types';

import  GrouponListItem from '../../../../wmkit/biz/groupon/groupon-list-item';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type IGrouponGoodsListProps = T.IProps & T.IGrouponGoodsListProps;

@connect<Partial<IGrouponGoodsListProps>, T.IGrouponGoodsListState>(
  store2Props,
  actions
)
export default class GrouponGoodsList extends React.Component<
  Partial<IGrouponGoodsListProps>,
  T.IGrouponGoodsListState
> {
  constructor(props: IGrouponGoodsListProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main: { chooseCateId, keyWords, sticky, toRefresh }
    } = this.props;

    const params = { grouponCateId: chooseCateId, goodsName: keyWords, sticky: sticky };
    const listViewProps = {
      loadingStyle:{marginTop:200},
      url: '/groupon/center/list',
      params: {
        ...params
      },
      isPagination: true,
      renderRow: (item, index) => {
        return <GrouponListItem goodInfo={item} id={index} />;
      },
      onDataReached: action.dealData,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="暂时没有拼团活动~"
        />
      ),
      // columnWrapperStyle: styles.bigBox,
      keyProps: 'goodsId',
      extraData: { toRefresh: toRefresh },
      needRefresh: false,
      noMoreStyle: {backgroundColor: 'transparent'}
    };
    return <WmListView {...listViewProps} />;
  }
}
