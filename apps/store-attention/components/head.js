import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';
import { List } from 'immutable';
import Check from 'wmkit/check';
import { noop } from 'wmkit/noop';

@Relax
export default class Head extends Component {
  static relaxProps = {
    isEdit: 'isEdit',
    attentionNum: 'attentionNum',
    checkedStoreIds: 'checkedStoreIds',
    setCheckedStore: noop,
    storeIds: 'storeIds'
  };

  render() {
    const { isEdit, attentionNum, checkedStoreIds } = this.props.relaxProps;
    const isCheckedAll = attentionNum == checkedStoreIds.size;
    return (
      <View style={styles.box}>
        {isEdit && (
          <Check
            checked={isCheckedAll}
            onCheck={() => this._checkAll(isCheckedAll)}
          />
        )}
        <Text style={styles.text} allowFontScaling={false}>
          关注店铺 {attentionNum}
        </Text>
      </View>
    );
  }

  /**
   * 全选or反全选
   * @param isCheckAll
   * @private
   */
  _checkAll = (isCheckAll) => {
    const { setCheckedStore } = this.props.relaxProps;
    if (isCheckAll) {
      //取消全选
      setCheckedStore(List());
    } else {
      //全选
      setCheckedStore(this.props.relaxProps.storeIds);
    }
  };
}

const styles = StyleSheet.create({
  box: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 10
  },
  text: {
    color: '#666',
    fontSize: 12,
    marginLeft: 10
  }
});
