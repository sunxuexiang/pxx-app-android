import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import LinearGradient from 'react-native-linear-gradient';
import { mainColor, priceColor, isAndroid } from 'wmkit/styles/index';
import { msg } from 'plume2';

type IPlayWayProps = T.IProps & T.IPlayWayProps;

@connect<Partial<IPlayWayProps>, T.IPlayWayState>(
  store2Props,
  actions
)
export default class PlayWay extends React.Component<
  Partial<IPlayWayProps>,
  T.IPlayWayState
> {
  constructor(props: IPlayWayProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      activity,

      goods,

      notice,

      otherGroup
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.playGame}>
          {/* 拼团玩法 */}
          <Text style={styles.title} allowFontScaling={false}>拼团玩法</Text>
          <Image source={require('../img/group-bj.png')} style={styles.playBj} />
          {/* <TouchableOpacity
            style={styles.right}
            activeOpacity={0.8}
            onPress={() =>
              msg.emit('router: goToNext', { routeName: 'GrouponRule' })
            }
          >
            <Text allowFontScaling={false} style={styles.playText}>玩法详情</Text>
            <Image source={require('../img/arrow.png')} style={styles.arrow} />
          </TouchableOpacity> */}
        </View>
        <View style={styles.bottomBox}>
          <LinearGradient
            colors={[mainColor, mainColor]}
            style={styles.line}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          ></LinearGradient>
          <View style={styles.item}>
            <Text style={[styles.num, { color: priceColor }]} allowFontScaling={false}>01</Text>
            <View style={[styles.row, { backgroundColor: mainColor }]}></View>
            <Text style={styles.text1} allowFontScaling={false}>选择商品</Text>
            <Text style={styles.text2} allowFontScaling={false}>付款开团/参团</Text>
          </View>

          <View style={styles.item}>
            <Text style={[styles.num, { color: priceColor }]} allowFontScaling={false}>02</Text>
            <View style={[styles.row, { backgroundColor: mainColor }]}></View>
            <Text style={styles.text1} allowFontScaling={false}>邀请并等待</Text>
            <Text style={styles.text2} allowFontScaling={false}>还有支付参团</Text>
          </View>

          <View style={styles.item}>
            <Text style={[styles.num, { color: priceColor }]} allowFontScaling={false}>03</Text>
            <View style={[styles.row, { backgroundColor: mainColor }]}></View>
            <Text style={styles.text1} allowFontScaling={false}>达到人数</Text>
            <Text style={styles.text2} allowFontScaling={false}>顺利成团</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    paddingVertical:16,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  playGame:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    position: 'relative',
    width: 134,
    height: 28
  },
  title:{
    fontSize:14,
    color:'rgba(0,0,0,0.8)',
    fontWeight:'500',
    position:'absolute',
    top: 12
  },
  playBj:{
    width: 134,
    height: 28,
    position: 'absolute',
    top: 0,
  },
  bottomBox:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    width: 285,
    marginTop: 16,
    position: 'relative',
  },
  item:{
    alignItems:'center',
  },
  num:{
    fontSize:18,
    fontWeight:'500'
  },
  row:{
    marginTop: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  text1:{
    fontSize:10,
    color:'rgba(0,0,0,0.4)',
    lineHeight: 14,
    marginTop: 8,
  },
  text2:{
    fontSize:10,
    color:'rgba(0,0,0,0.4)',
    lineHeight: 14
  },
  line:{
    width: 238,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: isAndroid ? 36 : 34,
    left: 30,
  },
});
