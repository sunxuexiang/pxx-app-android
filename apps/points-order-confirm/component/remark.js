import React, { Component } from 'react';
import { View, StyleSheet, PixelRatio, Platform, Text } from 'react-native';

import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import AutoGrowingTextInput from 'wmkit/autoGrowingTextInput';

const isAndroid = Platform.OS === 'android';

@Relax
export default class Remark extends Component {
  static relaxProps = {
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
    const { saveBuyerRemark } = this.props.relaxProps;
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
          multiline={true}
          minHeight={24}
          placeholder={'点此输入订单备注（100字以内）'}
          onChange={(e) => saveBuyerRemark(e.nativeEvent.text)}
          maxLength={100}
          textAlignVertical="top"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  remark: {
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    marginHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 14,
    color: '#333333',
    marginTop: isAndroid ? 2 : 5
  },
  textInput: {
    flex: 1,
    height: 30,
    textAlign: 'right',
    fontSize: 14,
    color: '#333333',
    padding: 0,
    paddingLeft: 20
  }
});
