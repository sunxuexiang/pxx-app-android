import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx 
import { screenWidth } from 'wmkit/styles/index';
import StoreCateList from '../../store-cate-list';

const isAndroid = Platform.OS === 'android';

/**
 * 商品列表分类查询
 */
@Relax
export default class Cate extends React.Component {
  static relaxProps = {
    setCateId: noop,
    selectedCate: 'selectedCate'
  };

  render() {
    const { setCateId, selectedCate } = this.props.relaxProps;

    return (
      <View style={styles.box}>
        <View style={styles.content}>
          <StoreCateList
            hide={this.props.hide}
            source="goodsList"
            sId={this.props.storeId}
            selectedCate={selectedCate.get(['storeCateIds', 0])}
            handleClick={(storeCateId, cateName) =>
              setCateId(storeCateId, cateName)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    left: 0,
    width: screenWidth,
    ..._.ifIphoneX(
      {
        top: 123
      },
      {
        top: isAndroid ? 89 : 109
      }
    )
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1
  }
});
