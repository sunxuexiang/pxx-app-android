import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as WMkit from 'wmkit/kit';
import * as _ from '../../wmkit/common/util';

import { msg } from 'plume2';
import { mainColor, screenWidth } from 'wmkit/styles/index';
const dates = [
  {
    img: require('./img/groupon-center.png'),
    text: '拼购',
    press: 'GrouponCenter'
  },
  {
    img: require('./img/groupon-hot.png'),
    text: '热拼排行',
    press: 'GrouponSelection'
  },
  {
    img: require('./img/groupon-rule.png'),
    text: '玩法介绍',
    press: 'GrouponRule'
  },
  {
    img: require('./img/my-groupon.png'),
    text: '我的拼购',
    press: 'GroupOrderList'
  }
];
export default class WMGrouponFooter extends Component {
  render() {
    const { currTab } = this.props;
    return (
      <View>
        <View
          style={{
            ..._.ifIphoneX(
              {
                height: 82
              },
              {
                height: 47
              }
            )
          }}
        />
        <View style={styles.bottom}>
          {dates.map((value, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (value.text == '我的拼购' && !WMkit.isLoginOrNotOpen()) {
                    msg.emit('loginModal:toggleVisible', {
                      callBack: () => {
                        msg.emit('router: goToNext', { routeName: value.press });
                      }
                    });
                  } else {
                    msg.emit('router: replace', {
                      routeName: value.press
                    });
                    window.currentRouteName = value.press;
                  }
                }}
                style={styles.conBox}
              >
                <Image
                  style={[
                    styles.img,
                    currTab == value.text ? { tintColor: mainColor } : ''
                  ]}
                  source={value.img}
                />
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.text,
                    currTab == value.text ? { color: mainColor } : ''
                  ]}
                >
                  {value.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopColor: '#e1e1e1',
    borderTopWidth: 1,
    ..._.ifIphoneX(
      {
        height: 82,
        paddingBottom: 35
      },
      {
        height: 47
      }
    )
  },
  conBox: {
    height: 47,
    width: screenWidth / 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 21,
    height: 21,
    marginBottom: 2,
  },
  text: {
    color: '#555',
    fontSize: 10
  }
});
