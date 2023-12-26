import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import { Relax, msg } from 'plume2';
// import * as _ from 'wmkit/common/util';
import * as _ from '../../../wmkit/common/util'; // added by scx

@Relax
export default class NowSpellGroup extends Component {
  static relaxProps = {
    goodsInfo: 'goodsInfo',
  };
  render() {
    const { goodsInfo } = this.props.relaxProps;
    return  goodsInfo.get('grouponLabel') ? (
      <TouchableOpacity style={styles.nowSpellGroup} activeOpacity={0.6}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'SpellGroupDetail',
            skuId: goodsInfo.get('goodsInfoId')
          })
        }>
        <Text allowFontScaling={false} style={styles.text}>该商品正在进行<Text allowFontScaling={false} style={{color: mainColor}}>拼团</Text></Text>
        <Text allowFontScaling={false} style={styles.seeBtn}>点击查看&gt;</Text>
      </TouchableOpacity>
    ) : null;
  }
}
const styles = StyleSheet.create({
  nowSpellGroup: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius:30,
    paddingHorizontal:13,
    paddingVertical:8,
    marginTop:10
  },
  text: {
    fontSize: 12,
    color: '#fff'
  },
  seeBtn: {
    fontSize: 11,
    color: '#fff',
  }
});
