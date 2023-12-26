import React, { Component } from 'react';
import { View, StyleSheet, PixelRatio, Platform, Text } from 'react-native';

import { Relax } from 'plume2';

import AutoGrowingTextInput from 'wmkit/autoGrowingTextInput';
import { noop } from 'wmkit/noop';

const isAndroid = Platform.OS === 'android';

@Relax
export default class Remark extends Component {
  static relaxProps = {
    orderConfirm: 'orderConfirm',

    saveBuyerRemark: noop
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
    this.forceResize = this.forceResize.bind(this);
  }

  forceResize(event) {
    const { nativeEvent } = event;
    if (
      Platform.OS !== 'ios' &&
      nativeEvent &&
      nativeEvent.contentSize &&
      nativeEvent.contentSize.height !== this.height
    ) {
      this.height = event.nativeEvent.height;
      this.input._handleNativeEvent(nativeEvent);
    }
  }

  render() {
    const { orderConfirm, saveBuyerRemark } = this.props.relaxProps;
    const index = orderConfirm.findIndex(
      (o) => o.get('storeId') == this.props.storeId
    );
    const buyerRemark = orderConfirm.getIn([index, 'buyerRemark']);
    return (
      <View style={styles.remark}>
        <Text allowFontScaling={false} style={styles.text}>
          订单备注
        </Text>
        <AutoGrowingTextInput
          {...this.props}
          onContentSizeChange={this.forceResize}
          ref={(ref) => (this.input = ref)}
          underlineColorAndroid="transparent"
          style={styles.textInput}
          defaultValue={buyerRemark}
          multiline={true}
          minHeight={24}
          placeholder={'点击输入，100字以内'}
          onChange={(e) =>
            saveBuyerRemark({
              remark: e.nativeEvent.text,
              storeId: this.props.storeId
            })
          }
          maxLength={100}
          textAlignVertical="top"
          placeholderTextColor="rgba(0,0,0,0.4)"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  remark: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  textInput: {
    flex: 1,
    height: 30,
    textAlign: 'right',
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)',
    padding: 0,
    paddingLeft: 20
  }
});
