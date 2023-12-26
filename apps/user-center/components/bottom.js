import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { msg, Relax } from 'plume2';

import { mainColor, screenWidth } from 'wmkit/styles/index';
import * as Button from 'wmkit/button';
import * as _ from 'wmkit/common/util'; // added by scx
const SubmitButton = Button.Submit;

@Relax
export default class UserCenterBottom extends Component {

  render() {
    return (
      <View style={styles.detailBottom}>
        <View style={styles.btnBox}>
          <SubmitButton
            disabled={false}
            text="立即购物"
            aotuFixed={true}
            boxStyle={{ marginRight: 4 }}
            btnStyle={{color: mainColor}}
            isLinear={false}
            onClick={() => msg.emit('router: goToNext', { routeName: 'Main' })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: screenWidth,
    padding: 12,
    zIndex: 1
  },
  btnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
});
