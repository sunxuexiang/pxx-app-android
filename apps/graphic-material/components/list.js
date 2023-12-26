import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Relax } from 'plume2';
import { fromJS } from 'immutable';

import { noop } from 'wmkit/noop';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';

import MatterItem from './matter-item';

@Relax
export default class List extends Component {
  static relaxProps = {
    changeAnnexMask: noop,
    changeShare: noop,
    sortEnclosures: 'sortEnclosures',
    visible: 'visible',
    changeText: noop,
    visibleMap: 'visibleMap',
    moments: noop,
    updateNum: noop,
    saveImageIndex: noop
  };

  render() {
    const { goodsInfoId } = this.props;

    const listViewProps = {
      url: '/distribution/goods-matter/page',
      params: {
        goodsInfoId: goodsInfoId,
        sortColumn: 'updateTime',
        sortRole: 'desc'
      },
      dataPropsName: 'context.distributionGoodsMatterPage.content',
      isPagination: true,
      renderRow: (item, index) => this._renderData(item, index),
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          imgStyle={{ width: 100, height: 100 }}
          desc="暂无发圈素材"
        />
      ),
      //onDataReached: actions.dealData,
      // renderEmpty: () => (
      //   <WMEmpty
      //     emptyImg={require('../img/list-none.png')}
      //     desc="您暂时还没有提现申请哦"
      //   />
      // ),
      keyProps: 'id'
      // extraData: { toRefresh: initialEnd }
    };

    return (
      <ScrollView style={styles.container}>
        <WmListView {...listViewProps} />
        {/*图文列表*/}
      </ScrollView>
    );
  }

  _renderData = (item, index) => {
    const {
      visibleMap,
      changeText,
      changeShare,
      moments,
      updateNum,
      saveImageIndex
    } = this.props.relaxProps;
    return (
      <MatterItem
        updateNum={(id) => updateNum(id)}
        changeShare={() => changeShare(item.matter, item.id)}
        key={item.id}
        visible={visibleMap.get(fromJS(item).get('id'))}
        onSpread={() => changeText(item.id)}
        matterItem={item}
        moments={() => moments()}
        saveImageIndex={(matter, index) => saveImageIndex(matter, index)}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 12
  }
});
