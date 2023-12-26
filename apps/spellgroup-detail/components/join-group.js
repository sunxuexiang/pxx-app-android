import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio
} from 'react-native';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import JoinGroupItem from './join-group-item';
@Relax
export default class JoinGroup extends Component {
  static relaxProps = {
    grouponInsts: 'grouponInsts',
    serverTime: 'serverTime',
    countOver: noop,
    toggleWaitGroupModal: noop
  };

  render() {
    const { grouponInsts, serverTime, countOver, toggleWaitGroupModal } = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <View style={styles.groupTitle}>
          <Text style={styles.titleText} allowFontScaling={false}>直接参与下面的团</Text>
          <TouchableOpacity TouchableOpacity={0.8} style={styles.titleRight} onPress={() => toggleWaitGroupModal()}>
            <Text style={styles.more} allowFontScaling={false}>查看更多</Text>
            <Image style={styles.arrow} source={require('../img/arrow-right.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.groupList}>
          {grouponInsts.map((item, i) => {
            return (
              <JoinGroupItem
                item={item}
                key={i}
                serverTime={serverTime}
                countOver={countOver}
              />
            );
          })}
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12
  },
  groupTitle: {
    paddingVertical: 10,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  titleText: {
    flex: 1,
    fontSize: 13,
    color: '#333'

  },
  titleRight: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  more: {
    fontSize: 13,
    color: '#333'
  },
  arrow: {
    width: 7,
    height: 13,
    marginLeft: 8
  },
});
