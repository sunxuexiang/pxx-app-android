import React, { Component } from 'react';
import { Text, StyleSheet, PixelRatio,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Relax } from 'plume2';
import * as Button from 'wmkit/button';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';
import { screenWidth, priceColor } from 'wmkit/styles/index';

const SubmitButton = Button.Submit;

@Relax
export default class ToolBar extends Component {
  static relaxProps = {
    checkPassword: noop,
    totalPoints: 'totalPoints'
  };

  render() {
    const { totalPoints } = this.props.relaxProps;
    return (
      <View style={styles.order_bottom}>
        <Text allowFontScaling={false} style={styles.bottom_text}>
          订单金额：
          <Text allowFontScaling={false} style={{ color: priceColor }}>
            {totalPoints}
            积分
          </Text>
        </Text>
        <SubmitButton onClick={() => this._submit()} text="提交订单" />
      </View>
    );
  }

  /**
   * 提交订单
   * @private
   */
  _submit = () => {
    const { checkPassword } = this.props.relaxProps;
    checkPassword();
  };
}

const styles = StyleSheet.create({
  order_bottom: {
    ..._.ifIphoneX({
      height: 83,
    }, {
    height: 48,
    }),
    ..._.ifIphoneXR({
      height: 83,
    }),
    borderTopColor: '#e1e1e1',
    borderTopWidth: 1 / PixelRatio.get(),
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screenWidth,
    paddingRight: 12
  },
  bottom_text: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
    padding: 0,
    margin: 0
  }
});
