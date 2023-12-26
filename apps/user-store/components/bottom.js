import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
} from 'react-native';

import { Confirm } from 'wmkit/modal/confirm';
import Check from 'wmkit/check';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { Relax } from 'plume2';
import { mainColor, screenWidth } from 'wmkit/styles/index';
const SubmitButton = Button.Submit;

@Relax
export default class Bottom extends React.Component {
  static relaxProps = {
    checkAll: 'checkAll',
    deleteFollows: noop,
    hasInvalid: 'hasInvalid',
    deleteInvalidGoods: noop,
    checkedItems: 'checkedItems',
    changeCheckAllStatus: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      checkAll,
      hasInvalid,
      checkedItems,
      changeCheckAllStatus
    } = this.props.relaxProps;

    return (
      <View style={styles.bottomBar}>
        <View style={styles.left}>
          <Check
            checked={checkAll}
            onCheck={() => changeCheckAllStatus(!checkAll)}
          />
          <Text allowFontScaling={false} style={styles.title}>
            全选
          </Text>
        </View>
        <View style={styles.right}>
          <SubmitButton
            disabled={!hasInvalid}
            boxStyle={[styles.invalidBtn, { borderColor: mainColor }]}
            btnTextStyle={[styles.invalidBox, { color: mainColor }]}
            text="清除失效商品"
            onClick={() => this._clearInvalidGoods()}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={checkedItems.size == 0 ? styles.selBtn : [styles.delBtn, { borderColor: mainColor }]}
            onPress={() => {
              if (checkedItems.size == 0) {
                return false;
              }
              this._deleteFollows();
            }}
          >
            <Text
              style={checkedItems.size == 0 ? styles.selText : { color: mainColor }}
            >
              删除
              {checkedItems.size != 0 && checkedItems.size}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _deleteFollows = () => {
    const { deleteFollows } = this.props.relaxProps;
    Confirm({
      title: '删除收藏',
      text: '您确定要删除所选商品？',
      okText: '确定',
      cancelText: '取消',
      okFn: function() {
        deleteFollows();
      }
    });
  };

  _clearInvalidGoods = () => {
    if (!this.props.relaxProps.hasInvalid) return;
    this.props.relaxProps.deleteInvalidGoods();
  };
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 48,
    width:screenWidth,
    borderTopColor: '#e1e1e1',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    position:'absolute',
    bottom:0,
    left:0,
    ..._.ifIphoneX(
      {
        height: 90,
        paddingBottom: 34
      },
      {
        height: 56
      }
    ),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: '#333',
    fontSize: 12,
    marginLeft: 5
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  invalidBtn: {
    width: 120,
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: 'transparent',
    marginTop: 2
  },
  delBtn: {
    width: 78,
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: 'transparent',
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 10
  },
  selBtn: {
    width: 78,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 18,
    backgroundColor: 'transparent',
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 10
  },
  selText: {
    color: '#ccc'
  }
});
