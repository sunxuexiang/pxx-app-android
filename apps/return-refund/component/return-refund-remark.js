import React from 'react';
import { View, Text, TextInput, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { remarkLengthQL } from '../ql';

/**
 * 退货退款备注
 */
@Relax
export default class ReturnRefundRemark extends React.Component {
  static relaxProps = {
    //退单备注
    description: 'description',

    //获取退单备注长度
    remarkLength: remarkLengthQL,

    //输入退货备注
    changReturnRemark: noop
  };

  render() {
    return (
      <View style={styles.box}>
        <Text allowFontScaling={false} style={styles.text}>
          退货说明
        </Text>
        <TextInput
          autoFocus={window.keyBoardShow}
          style={styles.input}
          placeholder="点此输入退货说明（100字以内）"
          maxLength={100}
          multiline={true}
          onChange={(e) =>
            this.props.relaxProps.changReturnRemark(e.nativeEvent.text)
          }
          value={this.props.relaxProps.description}
          underlineColorAndroid="transparent"
        />
        <Text
          allowFontScaling={false}
          style={{
            textAlign: 'right',
            color: '#939495',
            fontSize: 14
          }}
        >
          {this.props.relaxProps.remarkLength}
          /100
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    // borderBottomColor: '#ebebeb',
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderTopWidth: 1 / PixelRatio.get(),
    padding: 10,
    marginBottom: 10
  },
  input: {
    width: '100%',
    color: '#939495',
    fontSize: 14,
    padding: 5,
    textAlign: 'left'
  },
  text: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5
  }
});
