import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import Check from 'wmkit/check';
import * as Button from 'wmkit/button';

import { screenWidth,mainColor } from 'wmkit/styles/index';
import { List } from 'immutable';

const SubmitButton = Button.Submit;

@Relax
export default class Bottom extends React.Component {
  static relaxProps = {
    deleteAttention: noop,
    checkedStoreIds: 'checkedStoreIds', // 已勾选的店铺id列表
    attentionNum: 'attentionNum', //关注数量
    storeIds: 'storeIds',
    setCheckedStore: noop
  };

  render() {
    const {
      deleteAttention,
      attentionNum,
      checkedStoreIds
    } = this.props.relaxProps;
    const isCheckedAll = attentionNum == checkedStoreIds.size;
    return (
      <View style={styles.bottomBar}>
        <View style={styles.left}>
          <Check
            checked={isCheckedAll}
            onCheck={() => this._checkAll(isCheckedAll)}
          />
          <Text allowFontScaling={false} style={styles.title}>
            全选
          </Text>
        </View>
        <View style={styles.right}>
          {/* <SubmitButton text="取消关注" onClick={() => deleteAttention()} /> */}
          <TouchableOpacity
            style={
              checkedStoreIds.size == 0 ? styles.cancelBtn : [styles.submitBtn, { borderColor: mainColor }]
            }
            activeOpacity={0.8}
            onPress={() => deleteAttention()}
          >
            <Text
              style={
                checkedStoreIds.size == 0 ? styles.cancelText : [styles.btnText, { color: mainColor }]
              }
            >
              取消关注
            </Text>
          </TouchableOpacity>
        </View>
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
  bottomBar: {
    height: 47,
    borderTopColor: '#e1e1e1',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screenWidth
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: '#939495',
    fontSize: 13,
    marginLeft: 5
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 12
  },
  invalidBtn: {
    width: 94,
    height: 48,
    backgroundColor: '#ff7e90'
  },
  invalidBox: {
    borderWidth: 1,
    borderColor: '#ff7e90'
  },
  submitBtn: {
    width: 88,
    height: 36,
    borderRadius: 18,
    borderWidth: 1 / PixelRatio.get(),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelBtn: {
    width: 88,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 14
  },
  cancelText: {
    fontSize: 14,
    color: '#fff'
  }
});
