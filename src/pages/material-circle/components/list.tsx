import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';

import MatericalItem from './materical-item';
import api from 'api';
import { DistributionGoodsMatterPageVO1 } from '../../../web-api/DistributionGoodsMatterController';
import MarketingMatericalItem from '@/pages/material-circle/components/marketing-materical-item';

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(
  store2Props,
  actions
)
export default class List extends React.Component<
  Partial<IListProps>,
  T.IListState
> {
  constructor(props: IListProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const listViewProps = {
      url: '/distribution/goods-matter/page/new',
      params: {
        sortColumn: 'updateTime',
        sortRole: 'desc',
        matterType: main.matterType
      },
      loadingStyle:{marginTop:200},
      dataPropsName: 'context.distributionGoodsMatterPage.content',
      isPagination: true,
      renderRow: (item) => this.renderData(item),
      // onDataReached: this.props.actions.dealData,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/list-none.png')}
          desc="该商品没有发圈素材"
        />
      ),
      keyProps: 'id'
      // extraData: { toRefresh: initialEnd }
    };

    return <WmListView {...listViewProps} />;
  }

  renderData = (matter: T.IMatericalItemProps) => {
    let {
      actions: { action },
      main
    } = this.props;
    if (matter.matterType == 0) {
      return (
        <MatericalItem
          matterItem={matter}
          changeShare={() => action.changeShare(0, matter.matter)}
          key={matter.id}
          visible={main.visibleMap[matter.id]}
          onSpread={() => action.changeText(matter.id)}
          moments={() => action.moments()}
        />
      );
    }
    if (matter.matterType == 1) {
      return (
        <MarketingMatericalItem
          matterItem={matter}
          changeShare={() => action.changeShare(1, matter.matter)}
          key={matter.id}
          visible={main.visibleMap[matter.id]}
          onSpread={() => action.changeText(matter.id)}
          moments={() => action.moments()}
        />
      );
    }
  };
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 10
  }
});
