import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { Relax, msg } from 'plume2';
import { mainColor } from '@/wmkit/styles';

@Relax
export default class BuyAmount extends React.Component {
  static relaxProps = {
    today: 'today',
    month: 'month',
    total: 'total',
  };

  render() {
    const {today,month,total} = this.props.relaxProps;

    return (
      <View style={{flexDirection:'row',flexWrap:'wrap',width:'80%',paddingLeft:10}}>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>今日邀新</Text>
          <Text style={styles.price}>{today.get('totalCount')}</Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>今日采购件数</Text>
          <Text style={styles.price}>{today.get('totalGoodsCount')}</Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>今日订单金额</Text>
          <Text style={styles.price}>
            <Text style={styles.unit}>¥</Text>
            {(today.get('totalTradePrice')).toFixed(2)}
          </Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>本月邀新</Text>
          <Text style={styles.price}>{month.get('totalCount')}</Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>本月采购件数</Text>
          <Text style={styles.price}>{month.get('totalGoodsCount')}</Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>本月订单金额</Text>
          <Text style={styles.price}>
            <Text style={styles.unit}>¥</Text>
            {(month.get('totalTradePrice')).toFixed(2)}
          </Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>总计邀新</Text>
          <Text style={styles.price}>{total.get('totalCount')}</Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>总计采购件数</Text>
          <Text style={styles.price}>{total.get('totalGoodsCount')}</Text>
        </View>
        <View style={styles.buyBlock}>
          <Text style={styles.buyText}>总计订单金额</Text>
          <Text style={styles.price}>
            <Text style={styles.unit}>¥</Text>
            {(total.get('totalTradePrice')).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buyBlock:{
    width:'33.33%',
    paddingBottom:15
  },
  buyText:{
    fontSize:12,
    marginTop:5,
    color: '#00000066'
  },
  priceLine:{
    fontSize:14,
    textAlign:'center'
  },
  price:{
    fontSize:16,
    color: '#000000CC',
    paddingVertical:5
  },
  unit:{
    fontSize:12
  }
});
