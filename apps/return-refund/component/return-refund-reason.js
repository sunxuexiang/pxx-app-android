import React from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';
import RadioBox from 'wmkit/radio-box';
import { noop } from 'wmkit/noop';

/**
 * 退货退款原因
 */
@Relax
export default class ReturnRefundReason extends React.Component {
  static relaxProps = {
    returnReasonList: 'returnReasonList',
    selectedReturnReason: 'selectedReturnReason',
    changeReturnReason: noop
  };

  render() {
    const {
      returnReasonList,
      changeReturnReason,
      selectedReturnReason
    } = this.props.relaxProps;
    return (
      <View style={styles.refundReasonBox}>
        <Text style={styles.title}>选择退货原因</Text>
        <RadioBox
          data={returnReasonList}
          checked={selectedReturnReason}
          returnReason={true}
          onCheck={(value) => changeReturnReason(value)}
          style={{ width: '100%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  refundReasonBox: {
    backgroundColor: '#ffffff',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    borderTopColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get(),
    padding: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 14,
    color: '#333333',
    marginLeft: '2%',
    marginBottom: 5
  }
});
