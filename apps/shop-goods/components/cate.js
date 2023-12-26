import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import AllList from '../../all-list';

import { screenWidth } from 'wmkit/styles/index';

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
          <AllList
            hide={this.props.hide}
            source="goodsList"
            cateId={selectedCate.get('cateId')}
            handleClick={(cateId, cateName) => setCateId(cateId, cateName)}
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
    top: isAndroid ? 89 : 109,
    width: screenWidth
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1
  }
});
