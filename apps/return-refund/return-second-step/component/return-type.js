import React from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';
import RadioBox from 'wmkit/radio-box';
import { noop } from 'wmkit/noop';

/**
 * 退货方式
 */
@Relax
export default class ReturnType extends React.Component {
  static relaxProps = {
    returnWayList: 'returnWayList',
    selectedReturnWay: 'selectedReturnWay',
    changeReturnType: noop
  };

  render() {
    const {
      returnWayList,
      selectedReturnWay,
      changeReturnType
    } = this.props.relaxProps;

    return (
      <View style={styles.refundReasonBox}>
        <Text allowFontScaling={false} style={styles.title}>
          退货方式
        </Text>
        <RadioBox
          checked={selectedReturnWay}
          data={returnWayList}
          beforeTxt={false}
          onCheck={(value) => changeReturnType(value)}
          style={{ width: '100%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  refundReasonBox: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    borderTopColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get(),
    padding: 10,
    marginBottom: 10
  },
  title: {
    color: '#333333',
    fontSize: 14,
    marginBottom: 5
  }
});
