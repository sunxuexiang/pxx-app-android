import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Relax } from 'plume2';
import { mainColor } from 'wmkit/styles/index';

@Relax
export default class FailAmount extends Component {
  static relaxProps = {
    resultMoney:'resultMoney'
  }

  render() {
    const {resultMoney} = this.props.relaxProps;

    return (
      <View style={styles.failAmount}>
        <Text style={styles.failAmountTitle}>合计失效优惠</Text>
        <View style={styles.failAmountItem}>
          <Text style={styles.failAmountText}>优惠金额</Text>
          <Text style={[styles.failAmountMoney, { color: mainColor }]}>¥ {resultMoney.toFixed(2)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  failAmount:{
    backgroundColor:'#fff',
    padding:10,
    paddingBottom:0,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    marginHorizontal:10,
  },
  failAmountTitle:{
    fontSize:15,
    fontWeight:'700',
    paddingVertical:10
  },
  failAmountText:{
    fontSize:13,
  },
  failAmountItem:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingVertical:10,
    marginVertical:10,
  },
  failAmountMoney:{
    textAlign:'right',
    fontSize:13,
  }
})
